import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag';
import graphqlClient from '../utils/graphql';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appointments:[],
    visits:[],
    aces:[1,2,3,4]
  },
  mutations: {
    setVisits(state, visits) {
      state.visits = visits;
    }
  },
  actions: {
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
        });
    
        
        commit('setVisits', response.data.getVisits);
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
  }
})
