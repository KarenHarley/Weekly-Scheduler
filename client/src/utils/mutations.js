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
export const UPDATE_STEP = gql`
  mutation updateStep(
    $name: String!
    $notes: String
    $startingTime: String!
    $endingTime: String!
    $quadrant: String
    $_id: String!
  ) {
    updateStep(
      name: $name
      notes: $notes
      startingTime: $startingTime
      endingTime: $endingTime
      quadrant: $quadrant
      _id: $_id
    ) {
      name
      notes
      startingTime
      endingTime
      quadrant
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

export const CREATE_STEP = gql`
  mutation addStep(
    $name: String!
    $notes: String
    $task: ID!
    $startingTime: String!
    $endingTime: String!
    $quadrant: String
  ) {
    addStep(
      name: $name
      notes: $notes
      task: $task
      startingTime: $startingTime
      endingTime: $endingTime
      quadrant: $quadrant
    ) {
      name
      notes
      startingTime
      endingTime
      quadrant
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

export const REMOVE_TASK = gql`
  mutation removeTask($taskId: String!) {
    removeTask(taskId: $taskId) {
      username
    }
  }
`;

export const REMOVE_STEP = gql`
  mutation removeStep($stepId: String!,$taskId: String!) {
    removeStep(stepId: $stepId,taskId: $taskId) {
      username
    }
  }
`;

export const REMOVE_ALL_TASKS = gql`
mutation removeAllTasks($selectedDay: String!) {
  removeAllTasks(selectedDay: $selectedDay) {
   username
  }
}
`;
export const CHANGE_COMPLETED_TASK = gql`
  mutation changeCompletedTask($completed: Boolean!, $_id: String!) {
    changeCompletedTask(_id: $_id, completed: $completed) {
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
      user {
        _id
      }
    }
  }
`;

export const CHANGE_COMPLETED_STEP = gql`
  mutation changeCompletedStep($completed: Boolean!, $_id: String!) {
    changeCompletedStep(_id: $_id, completed: $completed) {
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
    }
  }
`;
