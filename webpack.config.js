const path = require("path");

module.exports = {
  entry: "./src/osero/index.js",
  mode: "development", //production development
  plugins: [],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",

            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: "dist",
    open: true,
  },
};
