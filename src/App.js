import { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import Logo from "./components/logo/Logo";
import Search from "./components/search/Search";
import NumRes from "./components/numRes/NumRes";
import Box from "./components/listbox/Box";
import WatchedSummary from "./components/watchedsummary/WatchedSummary";
import WatchedMoviesList from "./components/watchedmovielists/WatchedMoviesLists";
import MoviesLists from "./components/moviesLists/MoviesLists";
import MovieDetails from "./components/movie-detail/MovieDetails";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [seletcedID, setSelectedID] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=773314ad&s=${query}`
        );

        if (!res.ok) {
          throw new Error("something went wrong");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError(null);
      setSelectedID("");

      return;
    }

    fetchAPI();
  }, [query]);
  const handlerSelectedID = (id) => {
    setSelectedID((prevID) => (prevID === id ? null : id));
  };
  const handlerAddToWatchedList = (newMovie) => {
    setWatched((prevList) => [...prevList, newMovie]);
  };
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumRes movies={movies} />
      </Navbar>
      <Main movies={movies}>
        <Box>
          {isLoading && <p className="loader">Is Loading...</p>}
          {!isLoading && !error && (
            <MoviesLists
              movies={movies}
              handlerSelectedID={handlerSelectedID}
            />
          )}
          {!isLoading && error && <p className="error">{error}</p>}
        </Box>
        <Box>
          {!seletcedID ? (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          ) : (
            <MovieDetails
              selectedID={seletcedID}
              onAddMovie={handlerAddToWatchedList}
            />
          )}
        </Box>
      </Main>
    </>
  );
}
