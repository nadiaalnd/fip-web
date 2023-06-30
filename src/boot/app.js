import { boot } from 'quasar/wrappers'
import utils from '@utils/AppUtils'
import services from '@utils/ApiService'
import emitter from 'tiny-emitter/instance'
import axios from 'axios'

// firebase
export default boot(({ app }) => {
  // app
  app.config.globalProperties.$services = services
  app.config.globalProperties.$utils = utils
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.API_URL_IMG = process.env.API_URL_IMG

  // eventbus
  app.config.globalProperties.$global = {
    $on: (...args) => emitter.on(...args),
    $once: (...args) => emitter.once(...args),
    $off: (...args) => emitter.off(...args),
    $emit: (...args) => emitter.emit(...args)
  }
})
