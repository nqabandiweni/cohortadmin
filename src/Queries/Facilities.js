import gql from 'graphql-tag';

export const GET_ALL_FACILITIES =  gql`
query GetFacilities {
  getFacilities {
    name
    code
  }
}`