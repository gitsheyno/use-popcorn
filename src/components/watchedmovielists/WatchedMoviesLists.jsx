import WatchedMovie from "../watchedmovie/WatchedMovies";

const WatchedMoviesList = ({ watched, onDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.id} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
