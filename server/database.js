import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite database file in the project folder
const dbPath = path.join(__dirname, '..', 'neet_cbt.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency and performance
db.pragma('journal_mode = WAL');

// Create SQL Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS tests (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 200,
    total_questions INTEGER DEFAULT 200,
    total_marks INTEGER DEFAULT 720,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_id TEXT NOT NULL,
    q_number INTEGER NOT NULL,
    subject TEXT NOT NULL,
    section TEXT DEFAULT 'A',
    question_text TEXT NOT NULL,
    opt_a TEXT NOT NULL,
    opt_b TEXT NOT NULL,
    opt_c TEXT NOT NULL,
    opt_d TEXT NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tests (id) ON DELETE CASCADE,
    UNIQUE(test_id, q_number)
  );

  CREATE TABLE IF NOT EXISTS answer_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_id TEXT NOT NULL,
    q_number INTEGER NOT NULL,
    correct_option INTEGER NOT NULL, -- 0 for A, 1 for B, 2 for C, 3 for D
    explanation TEXT,
    FOREIGN KEY (test_id) REFERENCES tests (id) ON DELETE CASCADE,
    UNIQUE(test_id, q_number)
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL,
    candidate_name TEXT NOT NULL,
    roll_no TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    correct_count INTEGER NOT NULL,
    incorrect_count INTEGER NOT NULL,
    unattempted_count INTEGER NOT NULL,
    accuracy REAL NOT NULL,
    time_spent_seconds INTEGER NOT NULL,
    tab_switch_count INTEGER DEFAULT 0,
    responses_json TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests (id)
  );
`);

// Ensure pdf_url column exists in tests table
try {
  db.exec("ALTER TABLE tests ADD COLUMN pdf_url TEXT;");
} catch (e) {
  // Column already exists
}

// Ensure image_url column exists in questions table
try {
  db.exec("ALTER TABLE questions ADD COLUMN image_url TEXT;");
} catch (e) {
  // Column already exists
}

export default db;
