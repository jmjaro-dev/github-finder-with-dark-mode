// Search Icon
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
// Divider Component
import Divider from '../layout/divider/Divider';

const Search = ({ username, setUsername, setErrors, setSkipQuery, setRepos }) => {
  const onSubmit = _ => {
    setSkipQuery(false);
    setErrors(null);
    setRepos([]);
  }

  const onChange = e => {
    setUsername(e.target.value);
  }

  return (
    <div id="search" className="w-full">
      <div className="search-form flex flex-col mx-auto md:w-4/5">
        <div className="flex flex-col">
          <span className="mb-2 my-5">Search</span>
          <div className="searchbox-container flex justify-between">
            <input type="text" className="rounded-md w-full" placeholder="Enter a username..." value={username} onChange={onChange} />

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
  enabledBtn: "button-container rounded-md ml-4 flex items-center justify-center hover:shadow-lg cursor-pointer",
  disabledBtn: "button-container disabled rounded-md ml-4 flex items-center justify-center"
}
export default Search;