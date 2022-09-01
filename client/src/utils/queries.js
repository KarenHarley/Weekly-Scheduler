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
  query task($taskId: String!) {
    task(taskId: $taskId) {
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
  query step($stepId: String!) {
    step(stepId: $stepId) {
      _id
      name
      notes
      startingTime
      endingTime
      quadrant
      completed
      task
    }
  }
`;
export const QUERY_DUPLICATE_TASK = gql`
  query duplicateTask(
    $startingTime: String!
    $endingTime: String!
    $day: String!
    $task: String
  ) {
    duplicateTask(
      startingTime: $startingTime
      endingTime: $endingTime
      day: $day
      task: $task
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
    $task: String!
  ) {
    duplicateStep(
      startingTime: $startingTime
      endingTime: $endingTime
      day: $day
      task: $task
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
