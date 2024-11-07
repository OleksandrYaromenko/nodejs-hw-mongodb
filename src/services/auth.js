import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { Session } from "../models/session.js";
import crypto from "node:crypto";

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
  if(new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, "Session expired");
  }
  await Session.deleteOne({ userId: session._id });

  

  const newAccessToken = crypto.randomBytes(30).toString("base64");
  const newRefreshToken = crypto.randomBytes(30).toString("base64");

  return Session.create({
    userId: session._id,
    accessToken : newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUtil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}
