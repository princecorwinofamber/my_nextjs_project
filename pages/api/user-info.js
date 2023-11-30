import { getDB } from "../../lib/db";

export default async function handle(req, res) {
  const db = getDB();
  const user = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id=?', [req.query.id], (err, row) => {
      resolve(row);
    })
  });
  const { password_hash, salt, is_auth_token_deactivated, ...nonSecretUserData } = user || {};
  res.send({ user: nonSecretUserData });
}
