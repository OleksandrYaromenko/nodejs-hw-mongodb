import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from "../services/auth.js";

export async function registerController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const register = await registerUser(payload);

  res.send({
    status: 200,
    message: "Successfully logged in an user!",
    data: register,
  });
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  const session = await loginUser(email, password);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUtil,
  });
  res.cookie("sessionID", session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUtil,
  });

  res.status(200).send({
    status: 200,
    message: "Login completed",
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logoutController(req, res) {
  const { sessionID } = req.cookies;
  if (typeof sessionID === "string") {
    await logoutUser(sessionID);
  }

  res.clearCookie("refreshToken");
  res.clearCookie("sessionID");
  res.status(204).end();
}
export async function refreshController(req, res) {
  const { sessionID, refreshToken } = req.cookies;

 const session =  await refreshSession(sessionID, refreshToken);
 res.cookie("refreshToken", session.refreshToken, {
  httpOnly: true,
  expires: session.refreshTokenValidUtil,
});
res.cookie("sessionID", session._id, {
  httpOnly: true,
  expires: session.refreshTokenValidUtil,
});

res.status(200).send({
  status: 200,
  message: "Successfully refreshed a session!",
  data: {
    accessToken: session.accessToken,
  },
});}
