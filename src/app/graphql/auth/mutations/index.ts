import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      status
      data {
        _id
        email
        phoneNumber
        firstName
        lastName
        userType
        country
        isVerified
        status
        photo
      }
      message
    }
  }
`;

const LOGIN_USER = gql`
  mutation Mutation($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      status
      data {
        token
        user {
          _id
          email
          phoneNumber
          firstName
          lastName
          userType
          country
          isVerified
          status
          photo
        }
      }
      message
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation Mutation($email: String!) {
    forgotPassword(email: $email) {
      status
      data {
        _id
        email
        phoneNumber
        firstName
        lastName
        userType
        country
        isVerified
        status
        photo
      }
      message
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation Mutation($email: String!, $newPassword: String!, $token: String!) {
    resetPassword(email: $email, newPassword: $newPassword, token: $token) {
      status
      data {
        _id
        email
        phoneNumber
        firstName
        lastName
        userType
        country
        isVerified
        status
        photo
      }
      message
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation Mutation($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      status
      data {
        _id
        email
        phoneNumber
        firstName
        lastName
        userType
        country
        isVerified
        status
        photo
      }
      message
    }
  }
`;

const VERIFY_ACCOUNT = gql`
  mutation Mutation($email: String!, $token: String!) {
    verifyAccount(email: $email, token: $token) {
      status
      data {
        _id
        email
        phoneNumber
        firstName
        lastName
        userType
        country
        isVerified
        status
        photo
      }
      message
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, FORGOT_PASSWORD, RESET_PASSWORD, CHANGE_PASSWORD, VERIFY_ACCOUNT };
