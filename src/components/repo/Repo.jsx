import Moment from 'react-moment';
import {
  Link
} from "react-router-dom";

const Repo = ({ repo, setSkipReadMeQuery }) => {
  return (
    <div className="repo w-full flex flex-col justify-center">
      <div className="repo-name-container mb-2 flex items-center">
        <Link className="repo-name cursor-pointer text-lightAccent dark:text-darkAccent" to={`/readme/${repo.name}`} onClick={() => setSkipReadMeQuery(false)}>{repo.name}</Link>
        {repo.isPrivate && <span className="private-indicator ml-4 rounded-full text-lightGray dark:text-darkGray border border-lightDivider dark:border-darkDivider select-none">Private</span>}
      </div>
      <div className="mb-3">
      { repo.description !== null ? (
        <p className="repo-description text-lightText dark:text-darkText"> { repo.description } </p>
      ) : (
        <p className="no-description text-lightGray dark:text-darkGray">No description provided.</p>
      )}
      </div>
      <div className="repo-additional-info flex justify-between">
        {repo.languages.nodes.length > 0 ? (
          <div className="repo-core-language-container flex items-center">
            <span className="core-language-color rounded-full mr-2" style={{ backgroundColor: `${repo.languages.nodes[0].color}` }}>{' '}</span>
            <p className="capitalize text-lightText dark:text-darkText select-none">{repo.languages.nodes[0].name}</p>
          </div>
        ) : (<div />)}
        <div className="repo-last-updated text-lightText dark:text-darkText select-none">
          Updated {' '} 
          <Moment fromNow>{repo.updatedAt}</Moment>
        </div>
      </div>
    </div>
  )
}

export default Repo;