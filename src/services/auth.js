import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { Session } from "../models/session.js";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
import dotenv from "dotenv";
dotenv.config();

export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError(409, "Email already in user");
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw createHttpError(401, "Email or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch !== true) {
    throw createHttpError(401, "Email or password is incorrect");
  }
  await Session.deleteOne({ userId: user._id });

  const accessToken = crypto.randomBytes(30).toString("base64");
  const refreshToken = crypto.randomBytes(30).toString("base64");

  return Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUtil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}

export async function logoutUser(sessionID) {
  return Session.deleteOne({ _id: sessionID });
}

export async function refreshSession(sessionID, refreshToken) {
  const session = await Session.findById(sessionID);

  if (session === null) {
    throw createHttpError(401, "Session not found");
  }
  if (session.refreshToken !== refreshToken) {
    throw createHttpError(401, "Session not found");
  }
  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, "Session expired");
  }
  await Session.deleteOne({ userId: session._id });

  const newAccessToken = crypto.randomBytes(30).toString("base64");
  const newRefreshToken = crypto.randomBytes(30).toString("base64");

  return Session.create({
    userId: session._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + 60 * 60 * 1000),
    refreshTokenValidUtil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}

export async function requestResetPassword(email) {
  const user = await User.findOne({ email });
  if (user === null) {
    throw createHttpError(404, "User not found");
  }
  const resetToken = jwt.sign(
    { sub: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  try {
    await sendMail({
      from: "oleksandryaromenko21@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Click on the link to reset your password: http://localhost:3000/auth/reset-password?token=${resetToken}`,
    });
  } catch (error) {
    console.error(error);

    throw createHttpError(500, "Failed to send email");
  }
}

export async function resetPassword(password, token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.sub, email: decoded.email });
    if (user === null) {
      throw createHttpError(404, "User not found");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw createHttpError(401, "Token expired or invalid");
    }
    console.log(error);
  }
}

export async function loginOrRegisterUser(payload){
  const user = await User.findOne({ email: payload.email });
  console.log(user);
  
const password = await bcrypt.hash(crypto.randomBytes(30).toString("base64"), 10)
  if (user === null) {
     const createUser = User.create({
      name: payload.name,
      email: payload.email,
      password
    })
    return Session.create({
      userId:  createUser._id,
      accessToken: crypto.randomBytes(30).toString("base64"),
      refreshToken: crypto.randomBytes(30).toString("base64"), 
      accessTokenValidUntil: new Date(Date.now() + 60 * 60 * 1000),
      refreshTokenValidUtil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
  }
  await Session.deleteOne({ userId: user._id });
  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString("base64"),
    refreshToken: crypto.randomBytes(30).toString("base64"), 
    accessTokenValidUntil: new Date(Date.now() + 60 * 60 * 1000),
    refreshTokenValidUtil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

}
