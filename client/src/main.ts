import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// PRIME VUE
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css' // primevue theme
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Tooltip from 'primevue/tooltip';
app.directive('tooltip', Tooltip);

app.use(PrimeVue);
// =========

// ROUTER
import router from './router';
app.use(router)
// =======

// PINIA
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
// =====

app.mount('#app')
