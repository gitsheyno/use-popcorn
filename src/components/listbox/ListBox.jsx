import { useState } from "react";
import MoviesLists from "../moviesLists/MoviesLists";
const ListBox = ({ movies }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MoviesLists movies={movies} />}
    </div>
  );
};

export default ListBox;
