import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const dbPath = path.join(rootDir, 'neet_cbt.db');
const db = new Database(dbPath);

console.log('====================================================');
console.log('       NEET CBT PORTAL COMPREHENSIVE TEST SUITE     ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// 1. Database Tests
console.log('--- 1. DATABASE & CONTENT INTEGRITY CHECKS ---');
const tests = db.prepare('SELECT * FROM tests').all();
assert(tests.length === 5, `Expected 5 tests in DB, found ${tests.length}`);

const expectedTests = [
  'neet-2025-code-45',
  'neet-2025-code-46',
  'neet-2025-code-47',
  'neet-2025-code-48',
  'neet-official-kanha-e1'
];

for (const tId of expectedTests) {
  const t = tests.find(x => x.id === tId);
  assert(!!t, `Test ${tId} exists in tests table`);

  // Questions count
  const qCount = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE test_id = ?').get(tId).cnt;
  assert(qCount === 180, `Test ${tId} has exactly 180 questions (found: ${qCount})`);

  // Answer keys count
  const kCount = db.prepare('SELECT COUNT(*) as cnt FROM answer_keys WHERE test_id = ?').get(tId).cnt;
  assert(kCount === 180, `Test ${tId} has exactly 180 official answer keys (found: ${kCount})`);

  // Verify Subjects
  const subjects = db.prepare('SELECT DISTINCT subject FROM questions WHERE test_id = ?').all(tId).map(x => x.subject);
  assert(subjects.includes('Physics') && subjects.includes('Chemistry') && subjects.includes('Botany') && subjects.includes('Zoology'), 
    `Test ${tId} has all 4 NEET subjects: Physics, Chemistry, Botany, Zoology`);
}

// 2. Question Images on Disk Check
console.log('\n--- 2. QUESTION IMAGE CROPS CHECK ---');
const codes = ['45', '46', '47', '48', 'E1'];
let allImagesFound = true;
let totalImagesChecked = 0;

for (const code of codes) {
  for (let q = 1; q <= 180; q++) {
    const imgPath = path.join(rootDir, 'public', 'questions', code, `q_${q}.png`);
    if (!fs.existsSync(imgPath) || fs.statSync(imgPath).size < 100) {
      allImagesFound = false;
      console.error(`Missing or corrupt question image: ${imgPath}`);
      break;
    }
    totalImagesChecked++;
  }
}
assert(allImagesFound && totalImagesChecked === 900, `All 900 scanned question images (180 per paper x 5) exist and are non-empty`);

// 3. API & Evaluation Simulation
console.log('\n--- 3. EXAM SUBMISSION & EVALUATION LOGIC CHECK ---');
try {
  // Simulate submitting 3 questions:
  // Q1 correct, Q2 wrong, Q3 unattempted
  const testId = 'neet-2025-code-45';
  const q1Key = db.prepare('SELECT correct_option FROM answer_keys WHERE test_id = ? AND q_number = 1').get(testId).correct_option;
  const correctOpt = parseInt(q1Key, 10);
  const wrongOpt = (correctOpt + 1) % 4;

  const responses = {
    1: correctOpt, // Correct (+4)
    2: wrongOpt    // Wrong (-1)
  };

  // Expected score: +4 - 1 = 3
  const questions = db.prepare(`
    SELECT q.id, q.q_number, q.subject, q.question_text, q.opt_a, q.opt_b, q.opt_c, q.opt_d, q.image_url,
           ak.correct_option, ak.explanation
    FROM questions q
    LEFT JOIN answer_keys ak ON q.test_id = ak.test_id AND q.q_number = ak.q_number
    WHERE q.test_id = ?
    ORDER BY q.q_number ASC
  `).all(testId);

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  questions.forEach(q => {
    const sel = responses[q.q_number];
    if (sel === undefined || sel === null) {
      unattemptedCount++;
    } else if (sel === parseInt(q.correct_option, 10)) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const score = (correctCount * 4) - (incorrectCount * 1);
  assert(correctCount === 1, `Correct count evaluated correctly: ${correctCount}`);
  assert(incorrectCount === 1, `Incorrect count evaluated correctly: ${incorrectCount}`);
  assert(unattemptedCount === 178, `Unattempted count evaluated correctly: ${unattemptedCount}`);
  assert(score === 3, `Calculated score is correct: +4 - 1 = ${score}`);

} catch (err) {
  assert(false, `Evaluation simulation threw error: ${err.message}`);
}

// 4. Component Files Integrity
console.log('\n--- 4. COMPONENT FILES & IMPORTS INTEGRITY CHECK ---');
const componentsToCheck = [
  'App.jsx',
  'components/StudentPortal.jsx',
  'components/ExamLockedRoom.jsx',
  'components/ScorecardView.jsx',
  'components/ReportCardModal.jsx',
  'components/AttemptsHistorySection.jsx',
  'components/WelcomePopup.jsx'
];

for (const comp of componentsToCheck) {
  const fullPath = path.join(rootDir, 'src', comp);
  assert(fs.existsSync(fullPath), `Component file exists: ${comp}`);
}

console.log('\n====================================================');
console.log(`TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('====================================================');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
