import { createRouter, createWebHistory } from 'vue-router'
// import Login from '..views/Login.vue'
// import Register from '..views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CarrosView from '../views/CarrosView.vue'
import PropietariosView from '../views/PropietariosView.vue'
import RevisionesView from '@/views/RevisionesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    // { path: '/login', name: 'login', component: Login, meta: { guest: true } },
    // {path: '/register', name: 'register', component: Register, meta: { guest: true} },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/carros', name: 'carros', component: CarrosView, meta: { requiresAuth: true } },
    {
      path: '/propietarios',
      name: 'propietarios',
      component: PropietariosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/revisiones',
      name: 'revisiones',
      component: RevisionesView,
      meta: { requiresAuth: true },
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.meta.requiresAuth && !token) {
//     next({ name: 'login' })
//   } else if (to.meta.guest && token) {
//     next({ name: 'dasboard' })
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  next()
})
export default router
