
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	// publicPath: './', // 发布到github page上的配置路径
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

	// 打包的目录
	outputDir: 'dist',

	//assetsDir: 'static', // 静态资源目录
	//eslint-loader 是否在保存时校验格式
	lintOnSave: process.env.NODE_ENV === 'development',

	// 生产环境是否生成 SourceMap
	productionSourceMap: false,

	// 代理
	devServer: {
		// host: 'localhost', // 设置主机地址
		open: false, // 启动服务后是否打开浏览器
		port: 8888, // 服务端口
		https: false,
		hotOnly: false,
		proxy: {
			// 设置代理
			'/api': {
				target: 'https://www.ysdwat.com', //目标 API 地址
				ws: false, // 如果要代理 websockets
				secure: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '' //这里理解成用/api代替target里面的地址，
				}
			},
			'/ws': {
				target: 'https://chat.ysdwat.com',
				// target: 'https://101.132.105.248:9501',
				ws: true,
				secure: true,
				changeOrigin: true,
				pathRewrite: {
					'^/ws': ''
				}
			}
		},
		before: app => { }
	},

	// webpack配置项
	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.json']
		},
		output: {
			//输出重构
		},
		plugins: []
	},

	// webpack 高级配置，可修改loader 规则和具名插件
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
	},
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: true
	},
	pluginOptions: {}
}

// less
function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				resolve('./src/assets/style/global.less') // 需要全局导入的less
			]
		})
}
