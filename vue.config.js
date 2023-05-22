const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './'
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: '@use "@/assets/scss/main.scss" as *;'
  //     }
  //   }
  // }
})
