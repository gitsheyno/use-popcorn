import WatchedMovie from "../watchedmovie/WatchedMovies";

const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
