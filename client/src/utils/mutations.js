import { gql } from "@apollo/client";

export const updateTask = qql`
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
     name,
     notes,
     startingTime,
     endingTime,
     user {
           _id
     }
   }
 }
 `;

export const createTask = qql`
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
     name,
     notes,
     startingTime,
     endingTime,
     user {
           _id
     }
   }
 }
 `;
