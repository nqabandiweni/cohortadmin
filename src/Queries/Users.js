import gql from 'graphql-tag';

export const GET_USERS =  gql`
query getUsers {
  getUsers {
    name
    surname
    email
    code
    role
  }
}`