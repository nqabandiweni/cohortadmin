import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag';
import graphqlClient from '../utils/graphql';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Appointments:[],
    visits:[],
    updatedAppointment:{},
    AppointmentExistsMessage:""
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
    }
  },
  actions: {
    //get visits by cohort
    async fetchVisits({ commit }, cohort) {
      try {
        const response = await graphqlClient.query({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          query: gql`
            query GetVisits($cohort: CohortInput!) {
              getVisits(cohort: $cohort) 
            }
          `,
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
          query: gql`
            query GetAllAppointments {
              getAllAppointments {
                visit
                cohorts{
                  month
                  year
                }
              }
            }`,
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
          mutation: gql`
            mutation($visit: String!, $input: [CohortInput!]!){
              createAppointment(visit:$visit , cohorts:$input){
                __typename
                ...on AppointmentExistsError{
                  AppointmentExistsMessage
                }
                ...on Appointment{
                  visit
                  cohorts {
                    month
                    year
                  }
                }
              }
            }`,
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
          mutation: gql`
            mutation($visit: String!, $input: [CohortInput!]!){
              updateAppointment(visit:$visit , cohorts:$input){
                __typename
                ...on AppointmentNotFoundError{
                  AppointmentNotFoundMessage
                }
                ...on Appointment{
                  visit
                  cohorts {
                    month
                    year
                  }
                }
              }
        }`,
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
          mutation: gql`
            mutation($visit: String!){
              deleteAppointment(visit:$visit){
                __typename
                ...on AppointmentNotFoundError{
                  AppointmentNotFoundMessage
                }
                ...on Appointment{
                  visit
                  cohorts {
                    month
                    year
                  }
                }
              }
        }`,
        variables: { visit:visit },
        fetchPolicy: 'no-cache'
      });
    
        console.log(response)    
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    }
  }
})
