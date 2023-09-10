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

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("watched"))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [seletcedID, setSelectedID] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    console.log(controller);
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=773314ad&s=${query}`,
          { signal: controller.signal }
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

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const handlerSelectedID = (id) => {
    setSelectedID((prevID) => (prevID === id ? null : id));
  };

  const handlerAddToWatchedList = (newMovie) => {
    setWatched((prevList) => {
      return [...prevList, newMovie];
    });
    setSelectedID("");
  };

  const handlerDeleteMovie = (id) => {
    setWatched((prevState) => {
      const filteredWatchedLists = prevState.filter(
        (watchedMovie) => watchedMovie.id !== id
      );

      return filteredWatchedLists;
    });
  };

  const handlerBack = () => {
    setSelectedID("");
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
              <WatchedMoviesList
                watched={watched}
                onDelete={handlerDeleteMovie}
              />
            </>
          ) : (
            <MovieDetails
              selectedID={seletcedID}
              onAddMovie={handlerAddToWatchedList}
              watched={watched}
              onBack={handlerBack}
            />
          )}
        </Box>
      </Main>
    </>
  );
}
