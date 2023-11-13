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
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL, is_auth_token_deactivated INTEGER NOT NULL, display_name TEXT NOT NULL, signup_date DATETIME DEFAULT CURRENT_TIMESTAMP)');
    }
    return db;
}

// Database schema:
// Posts
// (id INTEGER PRIMARY KEY AUTOINCREMENT, thread_id INTEGER NOT NULL, author_id INTEGER NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, text TEXT NOT NULL)
// Treads
// (id INTEGER PRIMARY KEY AUTOINCREMENT, thread_name TEXT UNIQUE NOT NULL)
// Users
// (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL, is_auth_token_deactivated INTEGER NOT NULL,
//                                        display_name TEXT NOT NULL, signup_date DATETIME DEFAULT CURRENT_TIMESTAMP)

export function postToThread(thread_id, author_id, text) {
  db.get('INSERT INTO posts (thread_id, author_id, text) VALUES (?, ?, ?) RETURNING id;', [thread_id, author_id, text], (err, rows) => {
    getDBEventEmitter().emit(`post_${thread_id}`, { "id": rows.id, thread_id, author_id, text });
  });
}

export async function createThread(threadName) {
  if (threadName.length > 32) {
    return { success: false, reason: "Thread name is too long" };
  }
  if (!(/^[a-zA-Z0-9_]*$/.test(threadName))) {
    return { success: false, reason: "Thread name can only contain English letters, numbers and underscores" };
  }
  return await new Promise((resolve, reject) => {
    db.run('INSERT INTO threads (thread_name) VALUES (?);', [threadName], function(error) {
      if (error) {
        resolve({ success: false, reason: error.message });
      } else {
        resolve({ success: true, id: this.lastID });
      }
    });
  });
}

export async function signupUser(username, password, display_name) {
  if (username.length > 32) {
    return { success: false, reason: "Username is too long" };
  }
  if (!(/^[a-zA-Z0-9_]*$/.test(username))) {
    return { success: false, reason: "Username can only contain English letters, numbers and underscores" };
  }
  if (display_name.length > 100) {
    return { success: false, reason: "Displayed name is too long" };
  }
  if (!(/^[a-zA-Z ]*$/.test(display_name))) {
    return { success: false, reason: "Displayed name can only contain English letters and spaces" };
  }
  if (password.length > 100) {
    return { success: false, reason: "Password is too long" };
  }
  if (password.length < 6) {
    return { success: false, reason: "Password is too short" };
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.createHash('sha256').update(`${username}:${password}:${salt}`).digest('hex');
  return await new Promise((resolve, reject) => {
    db.run('INSERT INTO users (username, password_hash, salt, is_auth_token_deactivated, display_name) VALUES (?, ?, ?, ?, ?);',
      [username, passwordHash, salt, 0, display_name], function(error) {
        console.log("INSERT QUERY RESULT : ", error?.message, this.lastID, typeof error);
        if (error) {
          resolve({ success: false, reason: error.message });
        } else {
          resolve({ success: true, id: this.lastID });
        }
      });
  });
}
