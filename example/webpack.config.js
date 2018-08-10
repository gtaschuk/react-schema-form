const path = require('path')

module.exports = {
<<<<<<< HEAD
    context: __dirname,
    devServer: {
        contentBase: __dirname
    },
    entry: {
        form: './main'
    },
    output: {
        filename: '[name].entry.js'
    },
    resolve: {
        alias: {
            // Use uncompiled version
            'react-schema-form': '../src',
            // 'react-schema-form': '../dist/react-schema-form.min.js',
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }]
            }
        ]
    }
}
=======
  context: __dirname,
  devServer: {
    contentBase: __dirname
  },
  entry: {
    form: './main'
  },
  output: {
    filename: '[name].entry.js'
  },
  resolve: {
    alias: {
      // Use uncompiled version
      'react-schema-form': '../src',
      // 'react-schema-form': '../dist/react-schema-form.min.js',
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  module: {
      rules: [

          // I highly recommend using the babel-loader as it gives you
          // ES6/7 syntax and JSX transpiling out of the box
          {
              test: /\.(js|jsx)$/,
              use: [{
                loader: 'babel-loader'
              }],
              exclude: /node_modules/
          },
          {test: /\.less$/, use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }]},
          {test: /\.css?$/, use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }]},
          {test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: [{
            loader: 'url-loader',

            options: {
              limit: 100000
            }
          }] }
      ]
  }
};
>>>>>>> 26c6b98... hotfix
