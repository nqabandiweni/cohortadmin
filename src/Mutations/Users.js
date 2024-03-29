import gql from 'graphql-tag';

  export const REGISTER = gql`
  mutation ($name:String!,$surname:String!,$email:String!,$code:String!,$role:String!){
    register(name:$name,surname:$surname,email:$email,code:$code,role:$role){
      __typename
      ...on successfulRegistration{
        email
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
export const ACTIVATE = gql`
mutation($email: String!,$password: String!,$temporaryPassword:String!,$confirmPassword:String!){
  activate(email:$email,password:$password,temporaryPassword:$temporaryPassword,confirmPassword:$confirmPassword){
    __typename
    ...on invalidActivationError{
      invalidActivationMessage
    }
    ...on passwordMismatchError{
      passwordMismatchMessage
    }
    ...on userNotFoundError{
      userNotFoundMessage
    }
    ...on alreadyActivatedError{
      alreadyActivatedMessage
    }
    ...on invalidActivationError{
      invalidActivationMessage
    }
    ...on invalidTemporaryPasswordError{
      invalidTemporaryPasswordMessage
    }
    ...on successfulActivation{
      successMessage
    }
      }
    }`
    export const LOGIN = gql`
    mutation($email: String!,$password: String!){
      login(email:$email,password:$password){
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
            token
          }
          }
        }`

    export const DELETE_USER = gql `
    mutation DeleteUser($email:String!){
      deleteUser(email: $email){
        ...on authorisationError{
          authorisationMessage
        }
        ...on userNotFoundError{
            userNotFoundMessage
        }
        ...on User{
            email
            name
        }
      }
  
    }`
export const RESET_PASSWORD = gql`
mutation ResetPassword($email:String!){
  resetPassword(email: $email){
    ...on userNotFoundError{
      userNotFoundMessage
    }
    ...on successfulPasswordReset{
      temporaryPassword
    }
  }
}`