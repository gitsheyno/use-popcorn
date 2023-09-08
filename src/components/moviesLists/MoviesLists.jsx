import Movie from "../movie/Movie";

const MoviesLists = ({ movies, handlerSelectedID }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelect={handlerSelectedID} />
      ))}
    </ul>
  );
};

export default MoviesLists;
