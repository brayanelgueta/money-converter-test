import { createApp } from 'vue'

import './style.css'

import {createPinia} from 'pinia'
import ToastPlugin from 'vue-toast-notification'

import {authentication } from './plugins/authentication'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(ToastPlugin)
authentication.install().then(() => {
  app.use(router)
  app.mount('#app')
})

