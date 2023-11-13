import { getDB, createThread } from "../../lib/db";

export default async function handler(req, res) {
  const db = getDB();
  console.log('Create Thread', req.query);
  if (req.query.name) {
    const status = await createThread(req.query.name);
    res.status(200).json(status);
  } else {
    res.status(400);
  }
}
