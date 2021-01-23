const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DeepScope = require("webpack-deep-scope-plugin").default;
const MiniCss = require("mini-css-extract-plugin");
const Purgecss = require("purgecss-webpack-plugin");
const path = require("path");
const globAll = require("glob-all");
const srcAbs = path.resolve(__dirname, "src"); //得到src的绝对路径
const htmlPath = path.resolve(__dirname, "public/index.html");
const paths = globAll.sync([`${srcAbs}/**/*.js`, htmlPath]);// ** 匹配0或者更多的目录 
console.log(srcAbs);//它默认的路径都是右斜杠
console.log(paths);//这里会自动转为左斜杠
module.exports = {
  mode: "production",
  module: {
    rules: [{ test: /\.css$/, use: [MiniCss.loader, "css-loader"] }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DeepScope(),
    new MiniCss(),
    new Purgecss({
      paths
      //paths是一个数组,里面每个元素都是绝对路径,表示要匹配的文件,它会拿这些匹配的文件跟css文件
      //看哪些代码用到了,哪些没用到,没用到的css代码就会去除(所以dist目录下的main.css就会去除对应代码)
    })
  ]
};
