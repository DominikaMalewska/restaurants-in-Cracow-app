import React from "react";

const Search = props => {
  return (
    <form className="search-form" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        id="input"
        className="search-input"
        onChange={props.onSearchLocation}
        value={props.searchQuery}
        required
      />
      <label htmlFor="input" className="search-label">
        Search by name or category
      </label>
    </form>
  );
};

export default Search;
