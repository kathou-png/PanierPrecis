import path from "path";
import webpack from "webpack";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_DEV_URL": JSON.stringify(
        process.env.REACT_APP_DEV_URL
      ),
    }),
  ],
};
