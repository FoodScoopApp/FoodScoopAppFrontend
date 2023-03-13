// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { transform } = require("ttypescript");

const config = getDefaultConfig(__dirname);

config.transformer.transform = ({ src, filename, options }) => {
  const { code } = transform(src, {
    filename,
    ...options,
  });
  return { code, map: null };
}

module.exports = config;
