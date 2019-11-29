const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@component': path.resolve(__dirname, 'src/components')
      }
    }
  },
  devServer: {
    port: 2333
  },
  css: {
    requireModuleExtension: true
  }
};
