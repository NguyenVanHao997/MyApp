// scripts/coverage-warning.js
const fs = require('fs');
const path = './coverage/coverage-summary.json';

if (!fs.existsSync(path)) {
  console.warn('⚠️  File coverage-summary.json not found!');
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(path, 'utf8'));
const {lines, branches} = report.total;

if (lines.pct < 70) {
  console.warn(`⚠️ Warning: Line coverage is low: ${lines.pct}%`);
}
if (branches.pct < 60) {
  console.warn(`⚠️ Warning: Branch coverage is low: ${branches.pct}%`);
}
