const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {withSentryConfig} = require('@sentry/react-native/metro');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
// const config = {};

const config = getDefaultConfig(__dirname);
// module.exports = withSentryConfig(config);
module.exports = withSentryConfig(
  mergeConfig(getDefaultConfig(__dirname), config),
);
