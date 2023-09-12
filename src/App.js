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
import useHttpRequest from "./hooks/use-httpsRequest";
export default function App() {
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("watched"))
  );

  const [query, setQuery] = useState("");
  const [seletcedID, setSelectedID] = useState(null);
  const {
    data: movies,
    error,
    isLoading,
    httpReq,
    setError,
    setData,
  } = useHttpRequest();
  console.log(movies);
  useEffect(() => {
    const controller = new AbortController();

    if (!query.length) {
      setData([]);
      setError(null);
      setSelectedID("");

      return;
    }

    httpReq(
      {
        url: `http://www.omdbapi.com/?apikey=773314ad&s=${query}`,
        method: "GET",
      },
      query
    );
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
