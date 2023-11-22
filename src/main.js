import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-toast-notification/dist/theme-sugar.css';

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(router)
app.mount('#app')
app.use(vuetify)
app.use(ToastPlugin);