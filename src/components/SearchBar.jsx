
import React, { useState } from 'react';

function SearchBar({ initialCity = '', onSearch }) {
  const [input, setInput] = useState(initialCity);

  const submit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
