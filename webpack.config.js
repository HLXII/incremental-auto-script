const WebpackUserscript = require('webpack-userscript')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'theresmore_autoscript.user.js'
  },
  plugins: [
    new WebpackUserscript({
      headers: {
        name: 'Theresmore AutoScript',
        version: '0.0.0',
        description: 'Cheat your way to degeneracy',
        author: 'HLXII',
        match: "https://www.theresmoregame.com/play/",
        homepage: 'https://github.com/HLXII/Evolve-Autoscript',
        bugs: 'https://github.com/HLXII/Evolve-Autoscript/issues',
        require: 'https://code.jquery.com/jquery-1.11.1.min.js'
      }
    })
  ]
}