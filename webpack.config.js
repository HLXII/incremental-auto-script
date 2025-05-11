const WebpackUserscript = require('webpack-userscript')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/core/main.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'autoscript.user.js'
  },
  plugins: [
    new WebpackUserscript({
      headers: {
        name: 'Incremental Auto Script',
        version: '0.0.0',
        description: 'Cheat your way to infinity',
        author: 'HLXII',
        match: "https://www.theresmoregame.com/play/",
        homepage: 'https://github.com/HLXII/incremental-auto-script',
        bugs: 'https://github.com/HLXII/incremental-auto-script/issues',
        require: 'https://code.jquery.com/jquery-1.11.1.min.js'
      }
    })
  ]
}