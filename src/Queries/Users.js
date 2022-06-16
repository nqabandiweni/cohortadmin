import gql from 'graphql-tag';

export const GET_ADMINS =  gql`
query getAdmins {
  getAdmins {
    name
    surname
    username
    code
  }
}`