import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "./SearchBarSlice";


export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length === 0) {
      return;
    }
    dispatch(search(searchTerm));
    setSearchTerm('');
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
            id="searchBar"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            placeholder="search..."
        />
        <button className="searchButton" type="submit">search</button>
      </form>
    </section>
  );
}
