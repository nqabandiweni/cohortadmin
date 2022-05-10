import gql from 'graphql-tag';

export const GET_VISITS = gql`
query GetVisits($cohort: CohortInput!) {
  getVisits(cohort: $cohort) 
}
`
export const GET_ALL_APPOINTMENTS =  gql`
query GetAllAppointments {
  getAllAppointments {
    visit
    cohorts{
      month
      year
    }
  }
}`