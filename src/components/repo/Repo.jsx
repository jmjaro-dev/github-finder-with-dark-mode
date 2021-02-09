const Repo = ({ repo }) => {
  return (
    <div className="repo w-full flex flex-col justify-center">
      <div className="repo-name-container mb-2">
        <a className="repo-name" href={repo.url} target="_blank">{repo.name}</a>
      </div>
      <div className="mb-3">
        <p className="repo-description">{repo.desc}</p>
      </div>
      <div className="repo-additional-info flex justify-between">
        <div className="repo-core-language-container flex items-center">
          <span className="core-language-color rounded-full mr-2" style={{ backgroundColor: `${repo.coreLanguage.color}` }}>{' '}</span>
          <p className="capitalize">{repo.coreLanguage.name}</p>
        </div>
        <div className="repo-last-updated">
          {repo.updatedAt}
        </div>
      </div>
    </div>
  )
}

export default Repo;