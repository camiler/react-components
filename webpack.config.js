const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const entry = process.env.NODE_ENV === 'production' ? {
    reactbox: './src/components/index.js'
  } : {
    vendor: [
      'react',
      'react-dom'
    ],
    app: './src/page/app/index.js'
  };

const output = process.env.NODE_ENV === 'production' ? {
  path: path.resolve(__dirname, "dist"),
  filename: "index.js",
  library: 'ReactBox',
  libraryTarget: 'umd'
} : {
  path: path.resolve(__dirname, "public"),
  filename: "[name].js"
};

const config = {
  entry,
  output,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test:  /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: false,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        }, {
          loader: "less-loader",
          options: {
            outputStyle: 'expanded',
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[hash].[ext]',
            limit: 10000, // 10kb
          }
        }
      },
    ]
  }
};
if (process.env.NODE_ENV === 'development') {
  config.plugins = (function () {
    return ['app'].map(item => {
      return new HtmlWebPackPlugin({
        filename: item,
        template: './src/template/index.hbs',
        chunks: ['vendor', item],
        inject: true
      });
    })
  })();
}

if (process.env.NODE_ENV === 'production') {
  config.externals = {
    'react': 'umd react',
    'react-dom': 'umd react-dom'
  }
}
module.exports = config;