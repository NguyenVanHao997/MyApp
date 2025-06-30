// const {execSync} = require('child_process');
// const fs = require('fs');
// const path = require('path');

// // Đọc VERSION_CODE từ build_info.ts
// const buildInfoPath = path.resolve(__dirname, '../src/build_info.ts');
// const content = fs.readFileSync(buildInfoPath, 'utf8');
// const match = content.match(/VERSION_CODE\s*=\s*(\d+)/);
// const VERSION_CODE = match ? String(match[1]) : null;

// if (!VERSION_CODE) {
//   console.error('❌ Không tìm thấy VERSION_CODE trong build_info.ts');
//   process.exit(1);
// }

// const assetDir = path.resolve(
//   __dirname,
//   '../android/app/build/generated/assets/react/devRelease',
// );
// const sourcemapDir = path.resolve(
//   __dirname,
//   '../android/app/build/generated/sourcemaps/react/devRelease',
// );

// fs.mkdirSync(assetDir, {recursive: true});
// fs.mkdirSync(sourcemapDir, {recursive: true});

// try {
//   console.log('📦 Đang build Hermes bundle và sourcemap...');
//   execSync(
//     'npx react-native bundle ' +
//       '--platform android ' +
//       '--dev false ' +
//       '--entry-file index.js ' +
//       '--bundle-output android/app/build/generated/assets/react/devRelease/index.android.bundle ' +
//       '--sourcemap-output android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map',
//     {stdio: 'inherit'},
//   );

//   //ls -la android/app/build/generated/assets/react/devRelease/index.android.bundle
//   //ls -la android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map

//   //   mkdir -p android/app/build/generated/assets/react/devRelease
//   // mkdir -p android/app/build/generated/sourcemaps/react/devRelease
//   // mkdir -p android/app/build/generated/res/react/devRelease

//   // 📍 Kiểm tra Hermes bật hay không
//   const hermesEnabled = true; // hoặc đọc từ build.gradle nếu cần tự động

//   const bundlePath = hermesEnabled
//     ? 'android/app/build/generated/assets/react/devRelease/index.android.bundle.hbc'
//     : 'android/app/build/generated/assets/react/devRelease/index.android.bundle';

//   const sourcemapPath = hermesEnabled
//     ? 'android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.hbc.map'
//     : 'android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map';

//   console.log('🚀 Đang upload lên Sentry...');
//   execSync(
//     `npx @sentry/cli react-native gradle \
//       --bundle android/app/build/generated/assets/react/devRelease/index.android.bundle \
//       --sourcemap android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map \
//       --release myapp@dev_${VERSION_CODE} \
//       --dist ${VERSION_CODE} \
//       --org haonguyen-org \
//       --project myapp`,
//     {stdio: 'inherit'},
//   );
//   // execSync(
//   //   `npx @sentry/cli react-native gradle \
//   //     --bundle ${bundlePath} \
//   //     --sourcemap ${sourcemapPath} \
//   //     --release myapp@dev_${VERSION_CODE} \
//   //     --dist ${VERSION_CODE} \
//   //     --org haonguyen-org \
//   //     --project myapp`,
//   //   {stdio: 'inherit'},
//   // );

//   console.log('✅ Đã upload sourcemap Hermes lên Sentry thành công!');
// } catch (err) {
//   console.error('❌ Lỗi khi thực thi:', err.message);
//   process.exit(1);
// }

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

// Định nghĩa các đường dẫn
const bundlePath = path.resolve(
  __dirname,
  '../android/app/build/generated/assets/react/devRelease/index.android.bundle',
);
const sourcemapPath = path.resolve(
  __dirname,
  '../android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map',
);
const resPath = path.resolve(
  __dirname,
  '../android/app/build/generated/res/react/devRelease',
);

// ✅ Tạo thư mục nếu chưa tồn tại
fs.mkdirSync(path.dirname(bundlePath), {recursive: true});
fs.mkdirSync(path.dirname(sourcemapPath), {recursive: true});
fs.mkdirSync(resPath, {recursive: true});

try {
  console.log('📦 Đang build bundle và sourcemap...');
  execSync(
    `npx react-native bundle \
      --platform android \
      --dev false \
      --entry-file index.js \
      --bundle-output ${bundlePath} \
      --sourcemap-output ${sourcemapPath} \
      --assets-dest ${resPath}`,
    {stdio: 'inherit'},
  );

  if (!fs.existsSync(bundlePath) || !fs.existsSync(sourcemapPath)) {
    throw new Error('❌ Build không tạo ra được bundle hoặc sourcemap!');
  }

  console.log('🚀 Đang upload lên Sentry...');
  execSync(
    `npx @sentry/cli react-native gradle \
      --bundle ${bundlePath} \
      --sourcemap ${sourcemapPath} \
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
// ls -lh android/app/build/generated/assets/react/devRelease/index.android.bundle
// ls -lh android/app/build/generated/sourcemaps/react/devRelease/index.android.bundle.map
