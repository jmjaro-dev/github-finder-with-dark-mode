import { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";
import './App.scss';
// Components
import Header from './components/layout/header/Header';
import Search from './components/search/Search';
import Repos from './components/repos/Repos';
// GraphQL
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const token = "8cb593d7294b2ac4e83546f389760e67aa7771aa";

// Apollo Client
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: "Bearer " + token,
    'Content-Type': 'application/json'
  }
});

function App() {
  // States
  const [username, setUsername] = useState('jmjaro-dev');

  return (
    <ApolloProvider client={client}>
      <div className="App container">
        <Header />
        <Search username={username} setUsername={setUsername} />
        <Repos username={username} />
      </div>
    </ApolloProvider>
  );
}

export default App;