// Apollo Client
import { gql, useQuery } from '@apollo/client';
// Components
import Repo from '../repo/Repo';
import QueryError from '../layout/queryError/QueryError';
import Divider from '../layout/divider/Divider';
// Spinner
import Spinner from '../../assets/spinner/loader.gif';

const GET_REPOS_QUERY = gql`
  query($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        edges {
          node {
            id
            name
            description
            isPrivate
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
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

const NEXT_PAGE_QUERY = gql`
  query($username: String!, $endCursor: String!) {
    user(login: $username) {
      repositories(after: $endCursor, first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        edges {
          node {
            id
            name
            description
            isPrivate
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
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

const PREV_PAGE_QUERY = gql`
  query($username: String!, $startCursor: String!) {
    user(login: $username) {
      repositories(before: $startCursor, last: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        edges {
          node {
            id
            name
            description
            isPrivate
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
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

const Repos = ({ 
  repos, 
  setRepos,
  setLoading,
  setRepoCount,
  username, 
  lastUsername, 
  setLastUsername, 
  errors, 
  setErrors, 
  skipQuery,
  setSkipQuery,
  paginator,
  setPaginator,
  skipNextPageQuery, 
  setSkipNextPageQuery,
  skipPrevPageQuery,
  setSkipPrevPageQuery 
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
      setErrors('Something went wrong. Please check your connection.');
    }
  }

  // Get Respos Query
  const { loading } = useQuery(GET_REPOS_QUERY, {
    variables: { username },
    skip: skipQuery,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setRepos(data.user.repositories.edges);
      setLastUsername(username);
      setPaginator(data.user.repositories.pageInfo);
      setRepoCount(data.user.repositories.totalCount);
      toggleSkip();
      setLoading(false);
      window.scrollTo(0,0);
    },
    onError: (error) => {
      onError(error.toString());
      toggleSkip();
      setRepos([]);
      setLoading(false);
    }
  });

  // Next Page Query
  const { loading: loadingNext } = useQuery(NEXT_PAGE_QUERY, {
    variables: { username: lastUsername, endCursor: paginator.endCursor },
    skip: skipNextPageQuery,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setRepos(data.user.repositories.edges);
      setLastUsername(lastUsername);
      setPaginator(data.user.repositories.pageInfo);
      setSkipNextPageQuery(true);
      setLoading(false);
      window.scrollTo(0,0);
    },
    onError: (error) => {
      onError(error.toString());
      setSkipNextPageQuery(true);
      setRepos([]);
      setLoading(false);
    }
  });

  // Prev Page Query
  const { loading: loadingPrev } = useQuery(PREV_PAGE_QUERY, {
    variables: { username: lastUsername, startCursor: paginator.startCursor },
    skip: skipPrevPageQuery,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setRepos(data.user.repositories.edges);
      setLastUsername(lastUsername);
      setPaginator(data.user.repositories.pageInfo);
      setSkipPrevPageQuery(true);
      setLoading(false);
      window.scrollTo(0,0);
    },
    onError: (error) => {
      onError(error.toString());
      setSkipPrevPageQuery(true);
      setRepos([]);
      setLoading(false);
    }
  });


  if (loading || loadingNext || loadingPrev) return (
    <div id="repositories" className="w-screen">
      <div className="label-container flex flex-col items-center mx-auto">
        <img src={Spinner} className="my-10" height="40px" width="40px" />
        <span className="status text-lightText dark:text-darkText">
          Fetching repos of <span className="font-bold text-lightAccent dark:text-darkAccent">{username}</span>...
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
            <div id="repositories" className="w-screen">
              <div className="repositories-container flex flex-col mx-auto">
                <span className="repos-label flex justify-between select-none">
                  <span className="text-lightText dark:text-darkText">
                    Repositories of {' '}
                    <span className="username text-lightAccent dark:text-darkAccent">{lastUsername}</span>
                  </span>
                  <span className="text-lightText dark:text-darkText">
                    Showing 10 repos per page
                  </span>
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
            <div id="repositories" className="w-screen">
              <div className="repositories-container flex flex-col mx-auto">
                <span className="repos-label text-lightText dark:text-darkText">
                  Enter a username to fetch repositories.
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