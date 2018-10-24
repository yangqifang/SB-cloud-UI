const path = require('path')
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias:{
          "@src":path.resolve("src"),
          "@page":path.resolve("src/pages")
      }
    },
  },
};
