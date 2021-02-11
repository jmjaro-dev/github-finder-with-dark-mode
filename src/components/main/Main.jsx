import Search from '../search/Search';
import Paginator from '../layout/paginator/Paginator';
import Repos from '../repos/Repos';

const Main = ({
  isDarkMode, 
  username,
  setUsername,
  lastUsername,
  setLastUsername,
  errors,
  setErrors,
  repos,
  setRepos,
  loading,
  setLoading,
  repoCount,
  setRepoCount,
  skipQuery,
  setSkipQuery,
  setSkipReadMeQuery,
  skipNextPageQuery,
  setSkipNextPageQuery,
  skipPrevPageQuery,
  setSkipPrevPageQuery,
  paginator,
  setPaginator
}) => {
  return (
    <div>
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
        setSkipReadMeQuery={setSkipReadMeQuery}
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
  )
}

export default Main;