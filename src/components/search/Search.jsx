// Search Icon
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
// Divider Component
import Divider from '../layout/divider/Divider';

const Search = ({ 
  username, 
  setUsername, 
  setErrors, 
  setSkipQuery, 
  setRepos, 
  setRepoCount,
  setLoading 
}) => {

  const onSubmit = _ => {
    setSkipQuery(false);
    setLoading(true);
    setErrors(null);
    setRepos([]);
    setRepoCount(0);
    localStorage.setItem('username', username);
  }

  const onKeyPress = e => {
    if(e.which === 13) {
      setUsername(e.target.value);
      onSubmit();
    }
  }

  const onChange = e => {
    setUsername(e.target.value);
  }

  return (
    <div id="search" className="w-screen">
      <div className="search-form flex flex-col mx-auto">
        <div className="flex flex-col">
          <span className="text-lightText dark:text-darkText mb-2 my-5 select-none">Search</span>
          <div className="searchbox-container flex justify-between">
            <input type="text" className="rounded-md w-full dark:bg-darkBG dark:text-darkText" placeholder="Enter a username..." value={username} onChange={onChange} onKeyPress={onKeyPress} />

            {username !== '' ? (
              <div className={styles.enabledBtn} onClick={onSubmit} >
                <SearchIcon />
              </div>
            ) : (
              <div className={styles.disabledBtn} >
                <SearchIcon />
              </div>
            )}
          </div>  
        </div>
        <Divider />
      </div>
    </div>
  )
}

const styles = {
  enabledBtn: "button-container bg-lightBtn dark:bg-darkBtn rounded-md ml-4 flex items-center justify-center hover:shadow-lg cursor-pointer",
  disabledBtn: "button-container disabled bg-lightGray dark:bg-darkGray rounded-md ml-4 flex items-center justify-center"
}
export default Search;