import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
  mutation updateTask(
    $name: String!
    $notes: String
    $startingTime: String!
    $endingTime: String!
    $_id: String!
    $quadrant: String
  ) {
    updateTask(
      name: $name
      notes: $notes
      startingTime: $startingTime
      endingTime: $endingTime
      _id: $_id
      quadrant: $quadrant
    ) {
      name
      notes
      startingTime
      endingTime
      quadrant
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
    $day: String!
    $quadrant: String
  ) {
    addTask(
      name: $name
      notes: $notes
      startingTime: $startingTime
      endingTime: $endingTime
      day: $day
      quadrant: $quadrant
    ) {
      name
      notes
      startingTime
      endingTime
      quadrant
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
export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      email
      username
      password
    }
  }
`;
