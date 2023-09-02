import Movie from "../movie/Movie";

const MoviesLists = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesLists;
