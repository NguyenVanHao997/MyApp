const fs = require('fs');
const path = './coverage/coverage-summary.json';

if (!fs.existsSync(path)) {
  console.error('❌ coverage-summary.json not found.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const coverage = data.total.statements.pct;

console.log(`🧪 Coverage: ${coverage}%`);

if (coverage < 80) {
  console.error('❌ Coverage below 80%! Must be >= 80%.');
  process.exit(1);
}
