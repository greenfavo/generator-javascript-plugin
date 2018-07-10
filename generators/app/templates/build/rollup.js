const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const path = require('path')
const chalk = require('chalk')

let input = path.resolve(__dirname, '..', 'src/index.js')

// 文件打包成模块的格式
let formats = ['umd', 'es']

// 输入参数
const inputOption = {
  input,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      babelrc: false, // 防止和babel-register冲突
      presets: [['es2015', { modules: false }]]
    })
  ]
}

async function build (inputOption, outputOption) {
  // 生成打包对象
  const bundle = await rollup.rollup(inputOption)
  // 写入硬盘
  return bundle.write(outputOption)
}

let promises = formats.map(format => {
  // 输出配置
  let outputOption = {
    file: path.resolve(__dirname, '..', `dist/<%= name %>.${format}.js`),
    format
  }
  format === 'umd' && (outputOption.name = '<%= camelCaseName %>')
  return build(inputOption, outputOption)
})

Promise.all(promises)
  .then(() => {
    console.log(chalk.green('build done!'))
  })
  .catch(e => {
    console.log(chalk.red(e))
  })
