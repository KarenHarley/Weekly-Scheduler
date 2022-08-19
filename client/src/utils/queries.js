import { gql } from "@apollo/client";

export const QUERY_TASKS = gql`
  query tasks($selectedDay: String!) {
    tasks(selectedDay: $selectedDay) {
      _id
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
      user {
        username
        _id
      }
    }
  }
`;
export const QUERY_STEPS = gql`
  query steps($task: String!) {
    steps(task: $task) {
      _id
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
      user {
        username
        _id
      }
    }
  }
`;
export const QUERY_TASK = gql`
  query task($id: String!) {
    task(id: $id) {
      _id
      name
      notes
      day
      startingTime
      endingTime
      quadrant
      completed
      steps {
        _id
        name
        notes
        startingTime
        endingTime
        quadrant
        completed
      }
    }
  }
`;
export const QUERY_STEP = gql`
  query step($id: String!) {
    step(id: $id) {
      _id
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
    }
  }
`;
export const QUERY_DUPLICATE_TASK = gql`
  query duplicateTask(
    $startingTime: String!
    $endingTime: String!
    $day: String!
  ) {
    duplicateTask(
      startingTime: $startingTime
      endingTime: $endingTime
      day: $day
    ) {
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
      user {
        username
      }
    }
  }
`;
export const QUERY_DUPLICATE_STEP = gql`
  query duplicateStep(
    $startingTime: String!
    $endingTime: String!
    $day: String
  ) {
    duplicateStep(
      startingTime: $startingTime
      endingTime: $endingTime
      day: $day
    ) {
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
    }
  }
`;
export const QUERY_USER = gql`
  query user {
    user {
      username
      email
      password
    }
  }
`;
