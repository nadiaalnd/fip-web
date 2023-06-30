/* eslint-disable no-undef */
const DotEnv = require('dotenv')
let parsedEnv = null
if (process.env.NODE_ENV == 'development') {
  parsedEnv = DotEnv.config().parsed
} if (process.env.NODE_ENV == 'staging') {
  parsedEnv = DotEnv.config({ path: './.env.staging' }).parsed
} else {
  parsedEnv = DotEnv.config({ path: './.env.production' }).parsed
}

module.exports = function () {
  // Let's stringify our variables
  // for (key in parsedEnv) {
  //   if (typeof parsedEnv[key] === 'string') {
  //     parsedEnv[key] = JSON.stringify(parsedEnv[key])
  //   }
  // }
  if (process.env.APP) {
    parsedEnv.APP = process.env.APP
  }
  return parsedEnv
}
