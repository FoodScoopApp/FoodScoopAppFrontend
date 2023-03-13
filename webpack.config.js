const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    loader: "ts-loader",
    options: {
      compiler: 'ttypescript',
      compilerOptions: {
        noEmit: false
      }
    },
  });
  return config;
};
