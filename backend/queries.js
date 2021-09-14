import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers {
    result: getUsers {
      id
      username
      email
      createdAt
      isDeleted
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($details: details) {
    createUser(details: $details) {
      id
      username
    }
  }
`
