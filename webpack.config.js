'use strict'

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  output: {
    filename: 'cash2Utils.js',
    library: 'cash2Utils',
    libraryTarget: 'umd'
  },
  node: {
    fs: 'empty'
  },
  target: 'web'
}
