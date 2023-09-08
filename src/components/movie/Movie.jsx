const Movie = ({ movie, onSelect }) => {
  const handlerSelect = () => {
    onSelect(movie.imdbID);
  };
  return (
    <li key={movie.imdbID} onClick={handlerSelect}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
