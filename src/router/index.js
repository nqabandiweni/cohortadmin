import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'visits',
    component: () => import('../views/visits.vue')
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
    path: '/editAppointment',
    name: 'editAppointment',
    component: () => import('../views/editAppointment.vue'),
    props:true
  },
  {
    path: '/createAppointment',
    name: 'createAppointment',
    component: () => import('../views/createAppointment.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
