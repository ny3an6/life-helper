import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login'
import Registration from '@/components/RegistrationAuth'
import MainPage from '@/components/MainPage'

const routes = [
  { path: '/login', name: 'Login', component: Login, props: true },
  { path: '/registration', name: 'Registration', component: Registration, props: true },
  { path: '/mainpage', name: 'MainPage', component: MainPage, props: true },
  { path: '/', component: Login }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
