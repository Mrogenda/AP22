const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

let htmlPageNames = ['seite2'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/${name}.html`, // relative path to the HTML files
        filename: `${name}.html`, // output HTML files
        chunks: ['main'] // respective JS files
    })
});

module.exports = {
  mode: env,
  entry: './src/js/index.js',
  output: {
    filename: 'assets/js/main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
/*     clean: true, */
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
            (env === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ],
    },
    {
      test: /\.html$/,
      use: ["html-loader"]
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/images/[name][ext]',
      },
    },
    {
      test: /\.svg/,
      type: 'asset/inline',
      generator: {
        filename: 'assets/images/[name][ext]',
      },
    },

    {
      test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      type: "asset/resource",
      generator: {
        filename: 'assets/fonts/[name][ext]',
      },
    },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new HtmlWebpackPlugin({
        template: 'src/template.html',
        inject: true,
        filename: 'index.html',
        chunks: ['main']
    }),
].concat(multipleHtmlPlugins)
}