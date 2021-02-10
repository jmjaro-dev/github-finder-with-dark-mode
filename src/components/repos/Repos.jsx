// GraphQL
import { gql, useQuery } from '@apollo/client';
// Components
import Repo from '../repo/Repo';
import Divider from '../layout/divider/Divider';

const GET_REPOS_QUERY = gql`
  query($username: String!) {
    user(login: $username) {
      repositories(first: 50, orderBy: {field: CREATED_AT, direction: DESC}) {
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

const Repos = ({ username }) => {
  const { loading, error, data } = useQuery(GET_REPOS_QUERY, {
    variables: { username },
  });

  if (loading) return <span>Getting Repos of {username}... </span>;
  if (error) return `Error! ${error}`;

  let repositories = data.user.repositories.edges;
  
  return (
    <div id="repositories" className="w-full">
      <div className="repositories-container flex flex-col mx-auto md:w-4/5">
        <span className="repos-label">
          Repositories of {' '}
          <span className="username">{username}</span>
        </span>
        {
          repositories.map((repo, idx) => (
            <div key={repo.node.id}> 
              <Repo repo={repo.node} />
              {idx !== repositories.length - 1 && <Divider />}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Repos;