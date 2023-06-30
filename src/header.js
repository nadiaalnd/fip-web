import { createApp } from 'vue'
import { Quasar } from 'quasar'
import emitter from 'tiny-emitter/instance'
import utils from './utils/AppUtils'
import services from './utils/ApiService'
import axios from 'axios'
import { Notify, LocalStorage, Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './css/app.sass'

import App from './components/LayoutHeader.vue'

const myApp = createApp(App)
myApp.use(Quasar, {
    plugins: {
        LocalStorage,
        Notify,
        Dialog
    }, // import Quasar plugins and add here
})

// boot
// app
myApp.config.globalProperties.$services = services
myApp.config.globalProperties.$utils = utils
myApp.config.globalProperties.$axios = axios
const $global = {
    $on: (...args) => emitter.on(...args),
    $once: (...args) => emitter.once(...args),
    $off: (...args) => emitter.off(...args),
    $emit: (...args) => emitter.emit(...args)
}
myApp.config.globalProperties.$global = $global

// myApp.mount('#app-header')

export default {
    myApp
}