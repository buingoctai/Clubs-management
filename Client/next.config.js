/* eslint-disable */
const withCss = require('@zeit/next-css')
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => { }
}

module.exports = withCss({
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    )
    return config
  }
})

