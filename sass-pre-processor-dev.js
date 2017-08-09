const sass = require('node-sass')

module.exports = (data, filename) => {
  const css = sass.renderSync({
    data,
    file: filename,
    outputStyle: 'nested'
  }).css.toString('utf8')
  console.log(css);
  return css
}
