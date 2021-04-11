module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8080,
    // proxy : 'http://localhost:8082',
    proxy: {
      '/api/*': {
        target: 'http://localhost:8082',
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  outputDir: 'target/dist',
  assetsDir: 'static'
}