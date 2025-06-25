module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['transform-inline-environment-variables'],
  overrides: [
    {
      plugins: [
        [
          '@babel/plugin-transform-private-methods',
          {
            loose: true,
          },
        ],
      ],
    },
  ],
};
