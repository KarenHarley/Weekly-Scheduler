import { gql } from "@apollo/client";

export const QUERY_TASKS = gql`
  query tasks($selectedDay: String!) {
    tasks(selectedDay: $selectedDay) {
      _id
      name
      notes
      startingTime
      endingTime
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
    }
  }
`;
export const QUERY_DUPLICATE = gql`
  query duplicate($startingTime: String!, $endingTime: String!, $day: String!) {
    duplicate(startingTime: $startingTime, endingTime: $endingTime, day: $day) {
      name
      notes
      startingTime
      endingTime
      user {
        username
      }
    }
  }
`;
