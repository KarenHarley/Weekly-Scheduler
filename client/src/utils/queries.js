import { gql } from "@apollo/client";

export const QUERY_TASKS = gql`
  query tasks($userId: ID!) {
    tasks(userId: $userId) {
      _id
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