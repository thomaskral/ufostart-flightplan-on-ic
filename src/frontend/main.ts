/* eslint-disable prefer-rest-params,@typescript-eslint/ban-ts-comment */
import { createApp } from 'vue'
import App from '@/App.vue'
import './app/assets/app.css'
import { createPinia } from 'pinia'
import { router } from '@/app/services/router'
import { canisterId } from 'canisters/data_manager'

// eslint-disable-next-line no-console
console.log('🔥', canisterId)

const app = createApp(App)

app.use(router).use(createPinia()).mount('#root')
