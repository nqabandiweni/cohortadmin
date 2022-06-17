import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag';
import graphqlClient from '../utils/graphql';
import {LOGIN} from '../Mutations/Users'
import { UPDATE_APPOINTMENT ,DELETE_APPOINTMENT,CREATE_APPOINTMENT } from '../Mutations/Appointments';
import {GET_ALL_APPOINTMENTS,GET_VISITS} from '../Queries/Appointments'
import { GET_USERS } from '../Queries/Users';
import {respond} from '../utils/handleResponses'
const jwt = require('jsonwebtoken')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Appointments:[],
    visits:[],
    updatedAppointment:{},
    AppointmentExistsMessage:"",
    users:[],
    token: localStorage.getItem('token') || null,
    loginError:"",
    isLoading:false
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
    setLoginError(state,message){
      state.loginError=message
    },
    setLoginSuccess(state,data){
     
      localStorage.setItem('token',data.token) 
      state.token =data.token
    },
    setUsers(state,data){
      state.users=data
    },
    logout(state){
      state.token=""
    },
    setLoading(state,status){
      state.isLoading=status
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
    login({ commit },{username,password}) {

      commit('setLoading',true)
      return new Promise((resolve, reject) => {
         graphqlClient.mutate({
          mutation: LOGIN,
          variables: { username:username,password:password },
          fetchPolicy: 'no-cache'
      })
          .then(response => {
     
            if(response.data.login.__typename=="invalidPasswordError"){
              commit('setLoginError',response.data.login.invalidPasswordMessage)
            }else if(response.data.login.__typename=="userNotFoundError"){
              commit('setLoginError',response.data.login.userNotFoundMessage)
            }else if(response.data.login.__typename=="invalidDataError"){
              commit('setLoginError',response.data.login.invalidDataMessage)
            
            }else{
              //console.log(response.data.login.token)
              commit('setLoginSuccess',response.data.login)
            } 
            commit('setLoading',false)
              resolve(response)
          })
          .catch(err => { 
           // console.log(err)   
           commit('setLoading',false)
            reject(err)
          })
      })
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
    username:(state,getters)=>{
      if(getters.isLoggedIn){
        const decoded = jwt.decode(state.token,process.env.VUE_APP_SECRET)
        return decoded.user.username
      }
      else{
        return null
      }
        
      }
  }
})
