import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router.js'
import './assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())   // 👈 aqui
app.use(router)

app.mount('#app')
