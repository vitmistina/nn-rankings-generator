const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const assetsDir = path.join(__dirname, "docs");
const nodeModulesDir = path.join(__dirname, "node_modules");
const vendorsDir = path.join(__dirname, "src/app/vendors");
const indexFile = path.join(__dirname, "src/app/index.js");

const SPLIT_STYLE = true;

const config = {
  // devtool: '#source-map',
  entry: {
    app: ["babel-polyfill", indexFile],
    vendor: [
      "react",
      "react-dom",
      "react-tap-event-plugin",
      "react-hot-loader",
      "babel-polyfill",
      "jquery",
      "bootstrap/dist/js/bootstrap.min.js",
      "redux",
      "react-router-redux",
      "redux-logger",
      "redux-thunk",
      "react-router",
      "classnames",
      "axios",
      "js-base64",
      "moment",
      "react-bootstrap",
      "react-modal",
      "react-motion",
      "react-notification"
    ]
  },
  output: {
    path: assetsDir,
    filename: "app.bundle.[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [nodeModulesDir, vendorsDir],
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: SPLIT_STYLE
          ? ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                { loader: "css-loader", options: { importLoaders: 1 } },
                "postcss-loader"
              ]
            })
          : [
              "style-loader",
              { loader: "css-loader", options: { importLoaders: 1 } },
              "postcss-loader"
            ]
      },
      {
        test: /\.scss$/,
        use: SPLIT_STYLE
          ? ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                { loader: "css-loader", options: { importLoaders: 1 } },
                "postcss-loader",
                "sass-loader"
              ]
            })
          : [
              "style-loader",
              { loader: "css-loader", options: { importLoaders: 1 } },
              "postcss-loader",
              "sass-loader"
            ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              publicPath: "/public/assets/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Žebříček Maturity",
      inject: false,
      template: require("html-webpack-template"),
      appMountId: "root",
      lang: "cs-cz",
      mobile: true,
      baseHref: ""
    }),
    getImplicitGlobals(),
    setNodeEnv(),
    new ExtractTextPlugin("app.styles.[contenthash].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "app.vendor.bundle.[chunkhash].js"
    }),
    uglify()
  ]
};
/*
* here using hoisting so don't use `var NAME = function()...`
*/
function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery"
  });
}

function setNodeEnv() {
  return new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  });
}

function uglify() {
  return new webpack.optimize.UglifyJsPlugin({
    // Don't beautify output (enable for neater output)
    beautify: false,
    // Eliminate comments
    comments: true,
    // Compression specific options
    compress: {
      warnings: false,
      // Drop `console` statements
      drop_console: true
    },
    // Mangling specific options
    mangle: {
      // Don't mangle $
      except: ["$"],
      // Don't care about IE8
      screw_ie8: true,
      // Don't mangle function names
      keep_fnames: false
    }
  });
}
module.exports = config;
