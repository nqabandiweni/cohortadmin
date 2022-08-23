import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag';
import graphqlClient from '../utils/graphql';
import {LOGIN,ACTIVATE,REGISTER} from '../Mutations/Users'
import { UPDATE_APPOINTMENT ,DELETE_APPOINTMENT,CREATE_APPOINTMENT } from '../Mutations/Appointments';
import {GET_ALL_APPOINTMENTS,GET_VISITS} from '../Queries/Appointments'
import { GET_USERS } from '../Queries/Users';
import { GET_ALL_FACILITIES } from '../Queries/Facilities';
import {respond} from '../utils/handleResponses'
const jwt = require('jsonwebtoken')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Appointments:[],
    visits:[],
    Facilities:[],
    updatedAppointment:{},
    AppointmentExistsMessage:"",
    users:[],
    token: localStorage.getItem('token') || null,
    loginError:"",
    registrationError:"",
    isLoading:false,
    temporaryPassword:"",
    activatedMessage:""
  },
  mutations: {
    setVisits(state, visits) {
      state.visits = visits;
    },
    setAppointments(state, appointments) {
      state.Appointments = appointments;

    },
    addAppointment(state,appointment){
      state.Appointments.push(appointment)
    },
    setupdatedAppointment(state,appointment){
      state.updatedAppointment=appointment
    },
    setAppointmentExistsMessage(state,message){
      state.AppointmentExistsMessage=message
    },
    setRegistrationError(state,message){
      state.registrationError=message
    },
    setRegistrationSuccess(state,temporaryPassword){ 
      state.temporaryPassword =temporaryPassword
    },
    setActivateError(state,message){
      state.activateError=message
    },
    setActivateSuccess(state,message){
      state.activatedMessage =message
    },
    setLoginError(state,message){
      state.loginError=message
    },
    setLoginSuccess(state,token){
      localStorage.setItem('token',token) 
      state.token =token
    },
    setUsers(state,data){
      state.users=data
    },
    logout(state){
      state.token=""
    },
    setLoading(state,status){
      state.isLoading=status
    },
    setFacilities(state,data){
      state.Facilities=data
    }
  },
  actions: {
    //logout
    logout(context) {
      context.commit('logout')
      localStorage.clear()
  },
  
    //get users 
    async getUsers({ commit }) {
      try {
        const response = await graphqlClient.query({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          query: GET_USERS,
          fetchPolicy: 'no-cache'
        });
    
        
        commit('setUsers', response.data.getUsers);
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
    //get visits by cohort
    async fetchVisits({ commit }, cohort) {
      try {
        const response = await graphqlClient.query({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          query: GET_VISITS,
          variables: { cohort: cohort },
          fetchPolicy: 'no-cache'
        });
    
        
        commit('setVisits', response.data.getVisits);
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
    ////////////////////////////////////////////////////////////////////
    async fetchAllAppointments({ commit }) {
      try {
   
        const response = await graphqlClient.query({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          query:GET_ALL_APPOINTMENTS,
          fetchPolicy: "no-cache"
        });
    
        
        commit('setAppointments', response.data.getAllAppointments);
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
    async createAppointment({ commit },Appointment) {
      
      try {
        
        const response = await graphqlClient.mutate({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          mutation: 
          CREATE_APPOINTMENT,
        variables: { visit:Appointment.visit,input:Appointment.cohorts },

        fetchPolicy: 'no-cache'
      });
            if(response.data.createAppointment.__typename=="AppointmentExistsError"){
              commit('setAppointmentExistsMessage',response.data.createAppointment.AppointmentExistsMessage)
            }else{
              commit('addAppointment',Appointment)
            }
      
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
    async updateAppointment({ commit },Appointment) {
      
      try {
        
        const response = await graphqlClient.mutate({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          mutation: UPDATE_APPOINTMENT,
        variables: { visit:Appointment.visit,input:Appointment.cohorts },
        fetchPolicy: 'no-cache'
      });
    
        
        commit('setupdatedAppointment', response.data.updateAppointment);
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
    async deleteAppointment({ commit },visit) {
      
      try {
        
        const response = await graphqlClient.mutate({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          mutation:DELETE_APPOINTMENT,
        variables: { visit:visit },
        fetchPolicy: 'no-cache'
      });
    
          
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
    register({ commit },{name,surname,email,code,role}) {
      commit('setLoading',true)
      return new Promise((resolve, reject) => {
         graphqlClient.mutate({
          mutation: REGISTER,
          variables: { name:name,surname:surname,email:email,code:code,role:role },
          fetchPolicy: 'no-cache'
      })
          .then(response => {
             commit('setLoading',false)
             let result = respond(response.data.register)
             console.log(result.type)
             result.type=="success"?commit('setRegistrationSuccess',result.text):commit('setRegistrationError',result.text)
             resolve(response)
          })
          .catch(err => { 
           //console.log(err)   
           commit('setLoading',false)
            reject(err)
          })
      })
    },
    login({ commit },{email,password}) {

      commit('setLoading',true)
      return new Promise((resolve, reject) => {
         graphqlClient.mutate({
          mutation: LOGIN,
          variables: { email:email,password:password },
          fetchPolicy: 'no-cache'
      })
          .then(response => {
            let result = respond(response.data.login)
            result.type=="success"?commit('setLoginSuccess',result.text):commit('setLoginError',result.text)
             commit('setLoading',false)
              resolve(response)
          })
          .catch(err => { 
           // console.log(err)   
           commit('setLoading',false)
            reject(err)
          })
      })
    },
    activate({ commit },{email,temporaryPassword,password,confirmPassword}) {

      commit('setLoading',true)
      return new Promise((resolve, reject) => {
         graphqlClient.mutate({
          mutation: ACTIVATE,
          variables: { email:email,password:password,temporaryPassword:temporaryPassword,confirmPassword:confirmPassword },
          fetchPolicy: 'no-cache'
      })
          .then(response => {
            let result = respond(response.data.activate)
            result.type=="success"?commit('setActivateSuccess',result.text):commit('setActivateError',result.text)
             commit('setLoading',false)
              resolve(response)
          })
          .catch(err => { 
           // console.log(err)   
           commit('setLoading',false)
            reject(err)
          })
      })
    },
    async getFacilities({ commit }) {
      try {
   
        const response = await graphqlClient.query({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          query:GET_ALL_FACILITIES,
          fetchPolicy: "no-cache"
        });
    
        
        commit('setFacilities', response.data.getFacilities);
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    }
  },
  getters:{
    isLoggedIn: state => {
      // const decoded = jwt.decode(state.token,process.env.VUE_APP_SECRET)
      // if(state.token==null){
      //   return false
      // }else if(decoded.user){
      //   return true
      // }else{
      //   return false
      // }
      if(state.token == null || state.token == ""){
        return false
      }else {
      return true
      }
    },
    role:(state,getters)=>{
    
      if(getters.isLoggedIn){
        const decoded = jwt.decode(state.token,process.env.VUE_APP_SECRET)
        return decoded.user.role
      }
      else{
        return null
      }
    
      
    },
    name:(state,getters)=>{
      if(getters.isLoggedIn){
        const decoded = jwt.decode(state.token,process.env.VUE_APP_SECRET)
        return decoded.user.name
      }
      else{
        return null
      }
        
      },
      code:(state,getters)=>{
        if(getters.isLoggedIn){
          const decoded = jwt.decode(state.token,process.env.VUE_APP_SECRET)
          return decoded.user.code
        }
        else{
          return null
        }
          
        }
  }
})
