import MovieList from "../../components/MovieList";
import Navbar from "../../components/Navbar";
import './HomePage.css';
import SearchTab from "../../components/SearchTab";
import { useState } from "react";

const HomePage = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Navbar />
      <div className="home-bg">
        <div className="home">
          <h1>
            GET <span className="teal">MOVIE</span> TICKETS
          </h1>
          <p className="m-0">
            Buy movie tickets in advance, find movie times, watch trailers
          </p>
          <p className="m-0">
            read movie reviews and much more
          </p>
        </div>
      </div>

      {/* FILTER TAB */}
      <div className="movie-filter-section">
        <SearchTab onFilterChange={handleFilterChange} />
      </div>

      {/* MOVIE LIST */}
      <div className="movie-list-section">
        <MovieList filters={filters} />
      </div>
    </>
  );
};

export default HomePage;
