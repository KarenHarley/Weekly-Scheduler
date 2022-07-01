import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import Home from "./pages/Homepage";
import Tasks from "./pages/Tasks";
import "./App.css";
import OneTask from "./pages/OneTask";
import EditTask from "./pages/EditTask";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql", //sending request to graphql (localhost300/graphQL example)
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token"); //if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      //this is standard http
      ...headers, //added the headers in line 24
      authorization: token ? `Bearer ${token}` : "", //if there is a token return Bearer etc then token else empty string
    },
  };
});

//The setContext function accepts a function that returns either an object or a promise, which then returns an object to set the new context of a request. It receives two arguments: the GraphQL request being executed, and the previous context. This link makes it easy to perform the asynchronous lookup of things like authentication tokens and more.

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink), //sending our token in the requests graphql automatcally
  cache: new InMemoryCache(),
});
console.log(httpLink)
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tasks/:id">
              <Tasks />
            </Route>
            <Route exact path="/task/:id">
              <OneTask />
            </Route>
            <Route exact path="/task/edit/:id">
              <EditTask />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
