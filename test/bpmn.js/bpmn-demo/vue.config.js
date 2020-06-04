const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .end()
    /**
     * 引入raw-load是为了解决读取bpmn模板的问题
     * raw-loader可以让你在require文件时，通过default获取文件源字符串信息
     * 
     * 而raw-loader只是其一方法，
     * 我们还可以使用FileReader来读取文件
     * var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(oFREvent){
            var xmlDoc = oFREvent.target.result;
            openDiagram(xmlDoc);
        }
     */
    config.module
      .rule('raw-loader')
      .test(/.(bpmn|xml)$/)
      .use('raw-loader')
      .loader('raw-loader')
      // .options({
      //     esModule: true
      // })
      .end()
  }
}
