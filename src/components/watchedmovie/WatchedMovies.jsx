const WatchedMovie = ({ movie, onDelete }) => {
  const handlerDelete = () => {
    onDelete(movie.id);
  };
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime.split(" ")[0]} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={handlerDelete}>
        ❌
      </button>
    </li>
  );
};

export default WatchedMovie;
