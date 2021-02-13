import { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// Components
import Header from './components/layout/header/Header';
import Main from './components/main/Main';
import ReadMe from './components/readme/ReadMe';

// GraphQL
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// Context
import { ThemeProvider } from "./context/themeContext";


function App() {
  // Access Token Here
  const token = process.env.REACT_APP_API_ACCESS_TOKEN;

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

  // States
  const [isDarkMode, setIsDarkMode] = useState(null);
  const [username, setUsername] = useState('');
  const [lastUsername, setLastUsername] = useState('');
  const [errors, setErrors] = useState(null);
  const [repos, setRepos] = useState([]);
  const [readMeContent, setReadMeContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repoCount, setRepoCount] = useState(0);
  const [skipQuery, setSkipQuery] = useState(true);
  const [skipReadMeQuery, setSkipReadMeQuery] = useState(true);
  const [skipNextPageQuery, setSkipNextPageQuery] = useState(true);
  const [skipPrevPageQuery, setSkipPrevPageQuery] = useState(true);
  const [paginator, setPaginator] = useState({
    hasPreviousPage: false,
    hasNextPage: true,
    startCursor: "",
    endCursor: ""
  });

  useEffect(() => {
    // check if there is a username in local storage
    if(window.localStorage.getItem('username') !== null) {
      setUsername(window.localStorage.getItem('username'));
      setSkipQuery(false);
    }
  }, [])
  
  return (
    <ApolloProvider client={client}>
      <ThemeProvider setIsDarkMode={setIsDarkMode}>
        <div className="App container">
          <Header setIsDarkMode={setIsDarkMode} />
          <Router>
            <Switch>
              <Route exact path ='/'>
                <Main 
                  isDarkMode={isDarkMode} 
                  setIsDarkMode={setIsDarkMode}
                  username={username}
                  setUsername={setUsername}
                  lastUsername={lastUsername}
                  setLastUsername={setLastUsername}
                  errors={errors}
                  setErrors={setErrors}
                  repos={repos}
                  setRepos={setRepos}
                  loading={loading}
                  setLoading={setLoading}
                  repoCount={repoCount}
                  setRepoCount={setRepoCount}
                  skipQuery={skipQuery}
                  setSkipQuery={setSkipQuery}
                  setSkipReadMeQuery={setSkipReadMeQuery}
                  skipNextPageQuery={skipNextPageQuery}
                  setSkipNextPageQuery={setSkipNextPageQuery}
                  skipPrevPageQuery={skipPrevPageQuery}
                  setSkipPrevPageQuery={setSkipPrevPageQuery}
                  paginator={paginator}
                  setPaginator={setPaginator}
                />
              </Route>
              <Route exact path ='/readme/:name'> 
                <ReadMe
                  isDarkMode={isDarkMode}
                  lastUsername={lastUsername} 
                  readMeContent={readMeContent}
                  errors={errors}
                  setErrors={setErrors}
                  setReadMeContent={setReadMeContent} 
                  skipReadMeQuery={skipReadMeQuery} 
                  setSkipReadMeQuery={setSkipReadMeQuery}
                />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;