import { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";
import './App.scss';
// Components
import Header from './components/layout/header/Header';
import Search from './components/search/Search';
import Repos from './components/repos/Repos';
// GraphQL
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Paginator from './components/layout/paginator/Paginator';

const token = "8cb593d7294b2ac4e83546f389760e67aa7771aa";

// Apollo Client
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          repositories: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    }
  }),
  headers: {
    authorization: "Bearer " + token,
    'Content-Type': 'application/json'
  }
});

function App() {
  // States
  const [username, setUsername] = useState('');
  const [lastUsername, setLastUsername] = useState('');
  const [errors, setErrors] = useState(null);
  const [repos, setRepos] = useState([]);
  const [skipQuery, setSkipQuery] = useState(true);
  const [paginator, setPaginator] = useState({
    hasPreviousPage: false,
    hasNextPage: true,
    startCursor: null,
    endCursor: null
  });
  
  return (
    <ApolloProvider client={client}>
      <div className="App container">
        <Header />
        <Search username={username} setUsername={setUsername} setSkipQuery={setSkipQuery} setErrors={setErrors} />
        <Repos repos={repos} setRepos={setRepos} username={username} lastUsername={lastUsername} setLastUsername={setLastUsername} errors={errors} setErrors={setErrors} skipQuery={skipQuery} setSkipQuery={setSkipQuery} />
        {repos.length > 0 && <Paginator paginator={paginator} setPaginator={setPaginator} />}
      </div>
    </ApolloProvider>
  );
}

export default App;