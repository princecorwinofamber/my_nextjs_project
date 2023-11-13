import { getDB, signupUser } from "../../lib/db";

export default async function handler(req, res) {
  const db = getDB();
  console.log('Signup', req.body);
  if (req.body.username && req.body.password && req.body.display_name) {
    const signupResult = await signupUser(req.body.username, req.body.password, req.body.display_name);
    res.status(200).json(signupResult);
  } else {
    res.status(400);
  }
}
