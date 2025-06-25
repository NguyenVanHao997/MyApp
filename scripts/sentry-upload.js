const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

// Đọc VERSION_CODE từ build_info.ts
const buildInfoPath = path.resolve(__dirname, '../src/build_info.ts');
const content = fs.readFileSync(buildInfoPath, 'utf8');
const match = content.match(/VERSION_CODE\s*=\s*(\d+)/);
const VERSION_CODE = match ? String(match[1]) : null;

if (!VERSION_CODE) {
  console.error('❌ Không tìm thấy VERSION_CODE trong build_info.ts');
  process.exit(1);
}

// ✅ Tạo thư mục nếu chưa tồn tại
const assetDir = path.resolve(
  __dirname,
  '../android/app/build/generated/assets/react/devRelease',
);
const sourcemapDir = path.resolve(
  __dirname,
  '../android/app/build/generated/sourcemaps/react/devRelease',
);

fs.mkdirSync(assetDir, {recursive: true});
fs.mkdirSync(sourcemapDir, {recursive: true});

try {
  console.log('📦 Đang build bundle và sourcemap...');
  execSync(
    'npx react-native bundle ' +
      '--platform android ' +
      '--dev false ' +
      '--entry-file index.js ' +
      '--bundle-output android/app/build/generated/assets/react/devRelease/index.android.bundle ' +
      '--sourcemap-output android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map',
    {stdio: 'inherit'},
  );

  console.log('🚀 Đang upload lên Sentry...');
  execSync(
    `npx @sentry/cli react-native gradle \
      --bundle android/app/build/generated/assets/react/devRelease/index.android.bundle \
      --sourcemap android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map \
      --release myapp@dev_${VERSION_CODE} \
      --dist ${VERSION_CODE} \
      --org haonguyen-org \
      --project myapp`,
    {stdio: 'inherit'},
  );

  console.log('✅ Đã upload sourcemap lên Sentry thành công!');
} catch (err) {
  console.error('❌ Lỗi khi thực thi:', err.message);
  process.exit(1);
}
