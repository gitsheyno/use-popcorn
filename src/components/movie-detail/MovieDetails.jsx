import React, { useEffect, useState } from "react";
import StarRating from "../star-rating/StarRating";
const MovieDetails = ({ selectedID, onAddMovie }) => {
  const [movie, setMovie] = useState({});
  const [movieRating, setMovieRating] = useState("");

  useEffect(() => {
    const fetchedMovieByID = async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=773314ad&i=${selectedID}`
      );
      const data = await res.json();

      setMovie(data);
    };

    fetchedMovieByID();
  }, [selectedID]);

  const handlerAddMovie = () => {
    onAddMovie(movie);
    console.log({ ...movie, rate: movieRating });
  };

  return (
    <div className="details">
      <header>
        <img src={movie.Poster} alt={movie.title} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐️</span>
            {movie.imdbRating + " IMDB RATING"}
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating
            key={movie.imdbRating}
            defaultRating={0}
            maxRatinrg={10}
            size={24}
            movieRating={movieRating}
            setMovieRating={setMovieRating}
          />
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring by {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
        <button className="btn-add" onClick={handlerAddMovie}>
          Add to list
        </button>
      </section>
    </div>
  );
};

export default MovieDetails;
