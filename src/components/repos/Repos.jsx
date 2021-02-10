// GraphQL
import { gql, useQuery } from '@apollo/client';
// Components
import Repo from '../repo/Repo';
import QueryError from '../layout/queryError/QueryError';
import Divider from '../layout/divider/Divider';

const GET_REPOS_QUERY = gql`
  query($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            id
            name
            description
            languages(last: 1, orderBy: {field: SIZE, direction: ASC}) {
              nodes {
                color
                name
              }
            }
            updatedAt
            url
          }
        }
      }
    }
  }
`;

const Repos = ({ 
  repos, 
  setRepos, 
  username, 
  lastUsername, 
  setLastUsername, 
  errors, 
  setErrors,
  skipQuery, 
  setSkipQuery 
  }) => {
    
  // set skipQuery state to 'true' 
  const toggleSkip = _ => {
    setSkipQuery(true);
  }

  // set error state 
  const onError = err => {
    if(err.includes('Could not resolve to a User')){
      setErrors('User does not exist.');
    } else {
      setErrors('Something went wrong.');
    }
  }

  // query
  const { loading } = useQuery(GET_REPOS_QUERY, {
    variables: { username },
    skip: skipQuery,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setRepos(data.user.repositories.edges);
      setLastUsername(username);
      toggleSkip();
    },
    onError: (error) => {
      onError(error.toString());
      setRepos([]);
      toggleSkip();
    }
  });

  if (loading) return (
    <div id="repositories" className="w-full">
      <div className="label-container flex mx-auto md:w-4/5">
        <span className="status">
          Fetching repos of {username}...
        </span>
      </div>
    </div>
  )

  return (
    <>
      {/* If there are errors  */}
      {errors && repos !== null ? (
        <QueryError error={errors} />
      ) : (
        <>
          {repos.length > 0 ? 
          (
            <div id="repositories" className="w-full">
              <div className="repositories-container flex flex-col mx-auto md:w-4/5">
                <span className="repos-label">
                  Repositories of {' '}
                  <span className="username">{lastUsername}</span>
                </span>
                {
                  repos.map((repo, idx) => (
                    <div key={repo.node.id}> 
                      <Repo repo={repo.node} />
                      {idx !== repos.length - 1 && <Divider />}
                    </div>
                  ))
                }
              </div>
            </div>
          ) : (
            <div id="repositories" className="w-full">
              <div className="repositories-container flex flex-col mx-auto md:w-4/5">
                <span className="repos-label">
                  Search for a user's repo
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Repos;