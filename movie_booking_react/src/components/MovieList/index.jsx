import { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import './Movie/Movie.css';
import Endpoints from "../../api/Endpoints";

const MovieList = ({ filters }) => {
  const { keyword, city, cinema, genre } = filters;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(Endpoints.MOVIES_FILTER, {
          params: { keyword, city, cinema, genre },
        });

        if (response.status === 200) {
          const responseData = response.data;

          if (responseData.movies) {
            setMovies(responseData.movies);
          } else if (responseData.cinemas) {
            let filteredMovies = [];
            if (city || cinema) {
              const filteredCinemas = responseData.cinemas && Array.isArray(responseData.cinemas)
                ? responseData.cinemas.filter(
                  (cinemaData) =>
                    (!city || cinemaData.city.toLowerCase() === city.toLowerCase()) &&
                    (!cinema || cinemaData.name.toLowerCase() === cinema.toLowerCase())
                )
                : [];

              if (filteredCinemas.length > 0) {
                const allMovies = filteredCinemas.map((cinemaData) => cinemaData.movies).flat();
                const uniqueMovies = allMovies.filter((movie, index, self) =>
                  index === self.findIndex((m) => (
                    m.title.toLowerCase() === movie.title.toLowerCase()
                  ))
                );
                filteredMovies = uniqueMovies;
              }
            }

            const keywordFilteredMovies = responseData.movies && Array.isArray(responseData.movies)
              ? responseData.movies.filter((movie) =>
                movie.title.toLowerCase().includes(keyword.toLowerCase())
              )
              : [];

            setMovies(keywordFilteredMovies.length > 0 ? keywordFilteredMovies : filteredMovies);
          }
        } else {
          setError(`Failed to fetch movies: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error during API request: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [keyword, city, cinema, genre]);

  if (loading) {
    return <div className="spinner-border loading-api"></div>
  }

  if (error) {
    return <div className="error-msg">{error}!</div>;
  }

  return (
    <div className="ml-3 mr-4">
      <h1 className="text-light font-weight-bold">MOVIES</h1>
      <hr className="mt-0" style={{ borderColor: "#31D7A9" }} />
      {movies.length > 0 ? (
        <div className="row movie-list">
          {movies.map(movie => <Movie data={movie} key={movie.id} />)}
        </div>
      ) : (
        <div className="filter-msg">No movies found</div>
      )}
    </div>
  );
};

export default MovieList;
