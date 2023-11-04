import fs from 'fs';
const sqlite3 = require('sqlite3').verbose();

let db = null;

export function getDB() {
    if (!db) {
        db = new sqlite3.Database("db.db");
        db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)');
    }
    return db;
}

export async function loadTest() {
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts/')
  const res = await fetch('https://raw.githubusercontent.com/princecorwinofamber/update_test/main/README.md');
  console.log(res);
  const data = await res.json()

  return data
}
