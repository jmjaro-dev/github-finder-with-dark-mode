import Repo from '../repo/Repo';
import Divider from '../layout/divider/Divider';

const Repos = ({ repos, user }) => {
  return (
    <div id="repositories" className="w-full">
      <div className="repositories-container flex flex-col mx-auto md:w-4/5">
        <span className="repos-label">
          Repositories of {' '}
          <span className="username">{user}</span>
        </span>
        {repos.map((repo, idx) => (
          <div key={repo.id}> 
            <Repo repo={repo} />
            {idx !== repos.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Repos;