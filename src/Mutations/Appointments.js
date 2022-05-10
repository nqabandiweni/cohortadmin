import gql from 'graphql-tag';

export const CREATE_APPOINTMENT = gql`
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
}`

export const UPDATE_APPOINTMENT = gql`
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
}`



export const DELETE_APPOINTMENT =  gql`
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
}`

