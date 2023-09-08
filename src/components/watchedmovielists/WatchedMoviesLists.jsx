import WatchedMovie from "../watchedmovie/WatchedMovies";

const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {/* console.log(watched) */}
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
