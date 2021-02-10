import { useState } from 'react';
import "tailwindcss/tailwind.css";
import './App.scss';
// Components
import Header from './components/layout/header/Header';
import Search from './components/search/Search';
import Repos from './components/repos/Repos';
// GraphQL
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Paginator from './components/layout/paginator/Paginator';
// Context
import { ThemeProvider } from "./context/themeContext";

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
  const [isDarkMode, setIsDarkMode] = useState(null);
  const [username, setUsername] = useState('');
  const [lastUsername, setLastUsername] = useState('');
  const [errors, setErrors] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repoCount, setRepoCount] = useState(0);
  const [skipQuery, setSkipQuery] = useState(true);
  const [skipNextPageQuery, setSkipNextPageQuery] = useState(true);
  const [skipPrevPageQuery, setSkipPrevPageQuery] = useState(true);
  const [paginator, setPaginator] = useState({
    hasPreviousPage: false,
    hasNextPage: true,
    startCursor: "",
    endCursor: ""
  });
  
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <div className="App container">
          <Header setIsDarkMode={setIsDarkMode} />
          <Search 
            username={username} 
            setUsername={setUsername} 
            setSkipQuery={setSkipQuery} 
            setErrors={setErrors}
            setRepos={setRepos}
            setRepoCount={setRepoCount}
            setLoading={setLoading}
          />
          <Repos 
            repos={repos} 
            setRepos={setRepos}
            setLoading={setLoading}
            setRepoCount={setRepoCount}
            username={username} 
            lastUsername={lastUsername} 
            setLastUsername={setLastUsername} 
            errors={errors} 
            setErrors={setErrors} 
            skipQuery={skipQuery} 
            setSkipQuery={setSkipQuery}
            paginator={paginator}
            setPaginator={setPaginator}
            skipNextPageQuery={skipNextPageQuery} 
            setSkipNextPageQuery={setSkipNextPageQuery}
            skipPrevPageQuery={skipPrevPageQuery}
            setSkipPrevPageQuery={setSkipPrevPageQuery} 
          />
          {repoCount > 10 && !loading && 
            <Paginator 
              paginator={paginator}
              isDarkMode={isDarkMode}
              setLoading={setLoading} 
              setSkipNextPageQuery={setSkipNextPageQuery}
              setSkipPrevPageQuery={setSkipPrevPageQuery} 
            />
          }
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;