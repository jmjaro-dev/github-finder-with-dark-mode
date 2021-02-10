import Moment from 'react-moment';

const Repo = ({ repo }) => {
  return (
    <div className="repo w-full flex flex-col justify-center">
      <div className="repo-name-container mb-2 flex items-center">
        <a className="repo-name cursor-pointer" href={repo.url} target="_blank">{repo.name}</a>
        {repo.isPrivate && <span className="private-indicator ml-4 rounded-full">Private</span>}
      </div>
      <div className="mb-3">
      { repo.description !== null ? (
        <p className="repo-description"> { repo.description } </p>
      ) : (
        <p className="no-description">No description provided.</p>
      )}
      </div>
      <div className="repo-additional-info flex justify-between">
        {repo.languages.nodes.length > 0 ? (
          <div className="repo-core-language-container flex items-center">
            <span className="core-language-color rounded-full mr-2" style={{ backgroundColor: `${repo.languages.nodes[0].color}` }}>{' '}</span>
            <p className="capitalize">{repo.languages.nodes[0].name}</p>
          </div>
        ) : (<div />)}
        <div className="repo-last-updated">
          Updated {' '} 
          <Moment fromNow>{repo.updatedAt}</Moment>
        </div>
      </div>
    </div>
  )
}

export default Repo;