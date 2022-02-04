import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/css/style.scss'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
