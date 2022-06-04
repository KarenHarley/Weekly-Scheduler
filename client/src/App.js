import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Homepage';
// import Matchup from './pages/Matchup';
// import Vote from './pages/Vote';


const client = new ApolloClient({
  uri: '/graphql',
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
            {/* <Route exact path="/matchup">
              <Matchup />
            </Route>
            <Route exact path="/matchup/:id">
              <Vote />
            </Route> */}
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
