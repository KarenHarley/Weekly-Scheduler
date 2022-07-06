import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
  mutation updateTask(
    $name: String!
    $notes: String
    $startingTime: String!
    $endingTime: String!
    $_id: String!
  ) {
    updateTask(
      name: $name
      notes: $notes
      startingTime: $startingTime
      endingTime: $endingTime
      _id: $_id
    ) {
      name
      notes
      startingTime
      endingTime
      user {
        _id
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation addTask(
    $name: String!
    $notes: String
    $startingTime: String!
    $endingTime: String!
    $user: ID!
  ) {
    addTask(
      name: $name
      notes: $notes
      startingTime: $startingTime
      endingTime: $endingTime
      user: $user
    ) {
      name
      notes
      startingTime
      endingTime
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        email
      }
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        _id
        email
      }
      token
    }
  }
`;
