import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addVisit',
    name: 'addVisit',
    component: () => import('../views/addVisit.vue')
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: () => import('../views/Appointments.vue')
  },
  {
    path: '/visits',
    name: 'visits',
    component: () => import('../views/visits.vue')
  },
  {
    path: '/editAppointment',
    name: 'editAppointment',
    component: () => import('../views/editAppointment.vue'),
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
