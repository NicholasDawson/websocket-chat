import { createWebHistory, createRouter } from 'vue-router'

import LoginView from './components/LoginView.vue'
import ChatView from './components/ChatView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/chat', component: ChatView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router