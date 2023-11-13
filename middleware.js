// /middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: process.env.IRON_SESSION_COOKIE_NAME,
    password:process.env.COOKIE_ENCRYTPION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  // do anything with session here:
  const { user } = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  console.log("from middleware", { user });

  // demo:
  if (user?.admin !== true) {
    // unauthorized to see pages inside admin/
    return NextResponse.redirect(new URL('/unauthorized', req.url)) // redirect to /unauthorized page
  }

  return res;
};

export const config = {
  matcher: "/admin",
};
