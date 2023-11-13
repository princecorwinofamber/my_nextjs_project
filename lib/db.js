import fs from 'fs';
const sqlite3 = require('sqlite3').verbose();
import { EventEmitter } from 'node:events';
const crypto = require('crypto');

console.log("DB lib executed");
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

class DBEventEmitter extends EventEmitter {}
let dbEventEmitter;

if (process.env.NODE_ENV === 'development') {
  if (!global._dbEventEmitter) {
    console.log("Setting GLOBAL field");
    global._dbEventEmitter = new DBEventEmitter();
  }
} else {
  dbEventEmitter = new DBEventEmitter();
}

export function getDBEventEmitter() {
  if (process.env.NODE_ENV === 'development') {
    return global._dbEventEmitter;
  } else {
    return dbEventEmitter;
  }
}

let db = null;

export function getDB() {
    if (!db) {
        db = new sqlite3.Database("db.db");
        db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, thread_id INTEGER NOT NULL, author_id INTEGER NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, text TEXT NOT NULL)');
        db.run('CREATE TABLE IF NOT EXISTS threads (id INTEGER PRIMARY KEY AUTOINCREMENT, thread_name TEXT NOT NULL)');
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL, is_auth_token_deactivated INTEGER NOT NULL, display_name TEXT NOT NULL, signup_date DATETIME DEFAULT CURRENT_TIMESTAMP)');
    }
    return db;
}

// Database schema:
// Posts
// (id INTEGER PRIMARY KEY AUTOINCREMENT, thread_id INTEGER NOT NULL, author_id INTEGER NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, text TEXT NOT NULL)
// Treads
// (id INTEGER PRIMARY KEY AUTOINCREMENT, thread_name TEXT NOT NULL)
// Users
// (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL, is_auth_token_deactivated INTEGER NOT NULL,
//                                        display_name TEXT NOT NULL, signup_date DATETIME DEFAULT CURRENT_TIMESTAMP)

export function postToThread(thread_id, author_id, text) {
  db.get('INSERT INTO posts (thread_id, author_id, text) VALUES (?, ?, ?) RETURNING id;', [thread_id, author_id, text], (err, rows) => {
    getDBEventEmitter().emit(`post_${thread_id}`, { "id": rows.id, thread_id, author_id, text });
  });
}

export function createThread(threadName, onSuccess, onFailure) {
  db.get('INSERT INTO threads (thread_name) VALUES (?) RETURNING id;', [threadName], (err, rows) => {
    console.log(err);
    if (err) {
      onFailure();
    } else {
      onSuccess();
    }
  });
}

export function signupUser(username, password, display_name) {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.createHash('sha256').update(`${username}:${password}:${salt}`).digest('hex');
  db.get('INSERT INTO users (username, password_hash, salt, is_auth_token_deactivated, display_name) VALUES (?, ?, ?, ?, ?) RETURNING id;',
         [username, passwordHash, salt, 0, display_name], (err, rows) => {
    if (err) {
      // onFailure();
    } else {
      // onSuccess();
    }
  });
}
