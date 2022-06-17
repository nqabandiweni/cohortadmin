import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/visits',
    name: 'visits',
    component: () => import('../views/visits.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/addVisit',
    name: 'addVisit',
    component: () => import('../views/addVisit.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: () => import('../views/Appointments.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/editAppointment',
    name: 'editAppointment',
    component: () => import('../views/editAppointment.vue'),
    meta:{requiresAuth:true},
    props:true
  },
  {
    path: '/createAppointment',
    name: 'createAppointment',
    component: () => import('../views/createAppointment.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/users.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const authenticatedUser = store.getters.isLoggedIn
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // Check for protected route
  if (requiresAuth && ! authenticatedUser) next('/')
  else next();
})


export default router
