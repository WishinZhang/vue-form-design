const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@directives': path.resolve(__dirname, 'src/directives'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@views': path.resolve(__dirname, 'src/views')
      }
    }
  },
  devServer: {
    port: 2333,
    proxy: {
      '/dmp': {
        target: 'http://192.168.65.122:8080/dmp',
        ws: true,
        changeOrigin: true
      },
      '/vue-a3ui': {
        target: 'http://locahost:8686'
      }
    }
  },
  css: {
    requireModuleExtension: true
  }
};
