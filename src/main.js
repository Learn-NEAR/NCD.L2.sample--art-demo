import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import router from './router/index.js'
import './index.css'
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(router)
app.use(Toast)

app.mount('#app')