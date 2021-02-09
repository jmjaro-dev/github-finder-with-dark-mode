import Divider from '../layout/divider/Divider';

const Search = () => {
  return (
    <div id="search" className="w-full">
      <div className="search-form flex flex-col mx-auto md:w-4/5">
        <span className="mb-2 my-5">Search</span>
        <input type="text" className="rounded-md" placeholder="Enter a username..." />
        <Divider />
      </div>
    </div>
  )
}

export default Search;