import React, { useEffect, useState } from "react";
import StarRating from "../star-rating/StarRating";

const MovieDetails = ({ selectedID, onAddMovie, watched, onBack }) => {
  const [movie, setMovie] = useState({});
  const [movieRating, setMovieRating] = useState("");

  const isWatched = watched.map((movie) => movie.id).includes(selectedID);

  const watchedUserRating = watched.find(
    (movie) => movie.id === selectedID
  )?.userRating;

  const handlerBack = () => {
    onBack();
  };
  useEffect(() => {
    document.title = `Movie | ${movie.Title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [movie.Title]);

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
    onAddMovie({
      title: movie.Title,
      Poster: movie.Poster,
      imdbRating: movie.imdbRating,
      userRating: movieRating,
      runtime: movie.Runtime,
      id: movie.imdbID,
    });
  };

  return (
    <div className="details">
      <button className="btn-back" onClick={handlerBack}>
        &larr;
      </button>
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
          {!isWatched ? (
            <StarRating
              key={movie.imdbRating}
              defaultRating={0}
              maxRatinrg={10}
              size={24}
              movieRating={movieRating}
              setMovieRating={setMovieRating}
            />
          ) : (
            <p>your given rate is : {watchedUserRating}</p>
          )}
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring by {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
        {movieRating && (
          <button className="btn-add" onClick={handlerAddMovie}>
            Add to list
          </button>
        )}
      </section>
    </div>
  );
};

export default MovieDetails;
