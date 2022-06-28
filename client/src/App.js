import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Homepage";
import Tasks from "./pages/Tasks";
import "./App.css";
import OneTask from "./pages/OneTask";
import EditTask from "./pages/EditTask";


const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

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
