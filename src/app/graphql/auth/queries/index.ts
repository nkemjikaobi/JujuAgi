import { gql } from "@apollo/client";

const GET_USER = gql`
  query Query {
    me {
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

export { GET_USER };
