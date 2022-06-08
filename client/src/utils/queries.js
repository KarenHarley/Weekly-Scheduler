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
