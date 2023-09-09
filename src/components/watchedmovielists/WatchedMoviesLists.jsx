import WatchedMovie from "../watchedmovie/WatchedMovies";

const WatchedMoviesList = ({ watched }) => {
  console.log(watched);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.poster} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
