import App from './App.vue'
import { createApp } from 'vue'

import { createPinia } from 'pinia'

import router from './router/router.js'

// -- third party modules
import Vue3FormWizard from 'vue3-form-wizard'
import VueSmoothScroll from 'vue3-smooth-scroll'
import VueSmartWidget from 'vue-smart-widget'
import HighchartsVue from 'highcharts-vue'

import Toast from '@toasty'
import { POSITION } from '@toasty'

// -- third party styles
import 'vue3-form-wizard/dist/style.css'
import '@swal/dist/sweetalert2.min.css'
import '@loader/dist/css/index.css'
import '@toasty/dist/index.css'
import '@widgets/lib/style.css'

// --- bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// -- application bootstrap styles (scss)
import './themes/bootstrap.scss'

createApp(App)
    .use(createPinia())
    .use(Toast, { position: POSITION.TOP_CENTER, timeout: 2300 })
    .use(VueSmoothScroll, { duration: 700, updateHistory: false, offset: -100 })
    .use(VueSmartWidget)
    .use(Vue3FormWizard)
    .use(HighchartsVue)
    .use(router)
    .mount('#app')

import 'bootstrap/dist/js/bootstrap.js';