// pages/api/user.ts

import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    const { password_hash, salt, is_auth_token_deactivated, ...nonSecretUserData } = req.session.user || {};
    console.log("user api called for", nonSecretUserData?.username || "no user");
    res.send({ user: nonSecretUserData });
  },
  {
    cookieName: process.env.IRON_SESSION_COOKIE_NAME,
    password: process.env.COOKIE_ENCRYTPION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
