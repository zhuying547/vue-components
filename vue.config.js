const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/my-project/' : '/',
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
});
