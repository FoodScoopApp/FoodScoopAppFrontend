module.exports = function(api) {
  console.log(api)
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
