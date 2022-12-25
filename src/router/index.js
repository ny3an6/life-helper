import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import MainPage from '@/components/MainPage'
import store from '@/store/index'

const routes = [
  { path: '/login', name: 'login', component: Login, props: true },
  { path: '/registration', name: 'registration', component: Registration, props: true, meta: { requiresAuth: true } },
  { path: '/mainpage', name: 'mainpage', component: MainPage, props: true, meta: { requiresAuth: true } },
  { path: '/', component: Login }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.infoToken) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
