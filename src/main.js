import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'


const app = createApp(App)

app.mount('#app')
axios.defaults.baseURL = 'https://localhost:8099'
app.config.globalProperties.$axios=axios
