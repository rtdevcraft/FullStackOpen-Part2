const Search = ({ searchTerm, handleSearch }) => (
  <>
    <p>
      filter shown with <input value={searchTerm} onChange={handleSearch} />
    </p>
  </>
);

export default Search;
