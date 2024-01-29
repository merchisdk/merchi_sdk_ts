const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'merchi_sdk_ts',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true   
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{
          loader: 'ts-loader',
          options: {
              transpileOnly: true
          }
        }],
        exclude: /(node_modules)/,
      }
    ]
  }
};
