const QueryError = ({ error }) => {
  return (
    <div id="repositories" className="w-screen">
      <div className="error-container flex mx-auto md:w-4/5">
        <p className="error-text text-lightText dark:text-darkText">
          {error}
        </p>
      </div>
    </div>
  )
}

export default QueryError;