import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import VuePapaParse from 'vue-papa-parse'
import './assets/css/font.css'
// import './assets/css/style.css'
// import './assets/css/responsives.css'

createApp(App)
  .use(router)
  .use(store)
  .use(BootstrapVue3)
  .use(VuePapaParse)
  .mount('#app')
