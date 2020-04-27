import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './bootstrap.min.css';
import Launches from './components/Launches';
import Launch from './components/Launch';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
//  uri: 'http://localhost:4000/graphql',   //__Development path witout proxy attribute in package.json
  uri: '/graphql',   //__Production path

});

function App() {
  return (
    
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <div className="container">
          <h1 className="ml-2">App that fetches spacex...</h1>
        </div>

        <Route exact path="/" component={Launches} />
        <Route exact path="/launch/:flight_number" component={Launch} />      
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
