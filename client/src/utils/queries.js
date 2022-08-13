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
export const QUERY_TASK = gql`
  query task($taskId: String!) {
    task(taskId: $taskId) {
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
export const QUERY_DUPLICATE = gql`
  query duplicateTask($startingTime: String!, $endingTime: String!, $day: String!) {
    duplicateTask(startingTime: $startingTime, endingTime: $endingTime, day: $day) {
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

export const QUERY_USER = gql`
  query user {
    user {
      username
      email
      password
    }
  }
`;
