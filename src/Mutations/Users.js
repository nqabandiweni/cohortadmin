import gql from 'graphql-tag';

export const LOGIN = gql`
mutation($username: String!,$password: String!){
  login(username:$username,password:$password){
    __typename
      ...on invalidPasswordError{
        invalidPasswordMessage
      }
      ...on userNotFoundError{
        userNotFoundMessage
      }
      ...on invalidDataError{
          invalidDataMessage
      }
      ...on unactivatedUserError{
      unactivatedUserMessage
    }
      ...on loginSuccess{
        username
        token
      }
      }
    }`
  export const REGISTER = gql`
  mutation ($name:String!,$surname:String!,$username:String!,$code:String!,$role:String!){
    register(name:$name,surname:$surname,username:$username,code:$code,role:$role){
      __typename
      ...on successfulRegistration{
        username
        temporaryPassword
      }
      ...on userExistsError{
        userExistsMessage
      }
      ...on invalidUserError{
        invalidUserMessage
      }
  }
}
`