import { useState } from "react";
import MoviesLists from "../moviesLists/MoviesLists";
import Movie from "../movie/Movie";
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
      {isOpen1 && (
        <MoviesLists>
          {movies?.map((movie) => (
            <Movie movie={movie} />
          ))}
        </MoviesLists>
      )}
    </div>
  );
};

export default ListBox;
