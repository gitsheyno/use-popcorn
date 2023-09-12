import { useState, useRef, useEffect } from "react";

const Search = ({ query, setQuery }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    const callBack = (e) => {
      if (document.activeElement === searchRef.current) {
        return;
      }

      if (e.code === "Enter") {
        searchRef.current.focus();
        setQuery("");
      }
    };

    document.addEventListener("keydown", callBack);

    return () => {
      document.addEventListener("keydown", callBack);
    };
  }, []);
  return (
    <input
      ref={searchRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
export default Search;
