let moment = require('moment')

module.exports = () => {
  return moment().format("YYYY_MM_DD_HHmmss")
}