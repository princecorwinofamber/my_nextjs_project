// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: process.env.IRON_SESSION_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };
  