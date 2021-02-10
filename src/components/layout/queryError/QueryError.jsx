const QueryError = ({ error }) => {
  return (
    <div id="repositories" className="w-full">
      <div className="error-container flex mx-auto md:w-4/5">
        <p className="error-text">
          {error}
        </p>
      </div>
    </div>
  )
}

export default QueryError;