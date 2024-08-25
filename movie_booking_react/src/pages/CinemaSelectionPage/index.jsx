import React, { useState, useEffect } from 'react';
import "./CinemaSelectionPage.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Movie from '../../components/MovieList/Movie';
import Navbar from '../../components/Navbar';

const CinemaSelectionPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const nav = useNavigate();
  const cinemas = state.movie.cinemas;

  const userId = localStorage.getItem('user_id');
  const accessToken = localStorage.getItem('access_token');

  const [favorite_cinemas, setFavorite_cinemas] = useState(() => {
    const storedFavorites = localStorage.getItem(`favorite_cinemas`);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem(`favorite_cinemas`, JSON.stringify(favorite_cinemas));
  }, [favorite_cinemas]);

  const movieSchedules = ['12:00', '18:00'];

  const toggleHeart = async (cinemaId) => {
    if (!accessToken) {
      nav('/login');
      return;
    }

    const updatedFavorites = favorite_cinemas.includes(cinemaId)
      ? favorite_cinemas.filter(id => id !== cinemaId)
      : [...favorite_cinemas, cinemaId];

    setFavorite_cinemas(updatedFavorites);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/toggle/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ favorite_cinemas: updatedFavorites })
      });

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

    } catch (error) {
      console.error('Error updating favorites:', error.message);
    }
  };

  const isCinemaFavorite = (cinemaId) => {
    return favorite_cinemas.includes(cinemaId);
  };

  const handleProceedToBooking = (cinema, schedule) => {
    nav(`/${id}/cinema-list/buy`, { state: { movie: state.movie, cinema, schedule } });
  };

  return (
    <>
      <Navbar />
      <div className="container cinema-container text-light">

        <Link to={`/${id}`} className="join-btn pl-2 pr-3">
          &#11164; BACK
        </Link>

        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="movie-card">
              <img style={{ maxHeight: '330px', objectFit: 'cover', objectPosition: 'top' }} src={state.movie.poster} alt="" />
              <div className="card-header border-primary">
                <h4 className='mb-0 font-weight-bold'>{state.movie.title}</h4>
              </div>
              <div className="card-body">
                <div className="rating">
                  <div className='mb-1'>
                    Genre: {state.movie.genre}
                  </div>
                </div>
                <div className="text-info">{state.movie.description}</div>
              </div>
              <div className="card-footer bg-secondary mb-0 font-weight-bold">
                Starring: {state.movie.starring_actor}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {cinemas.length === 0 ? (
              <h3 className='h-100 d-flex align-items-center justify-content-center'>No show for this movie</h3>
            ) : (
              <ul className="cinema-scroll seat-plan-wrapper">
                {cinemas.map((cinema) => (
                  <li key={cinema.id}>
                    <div className="movie-name">
                      <div className="like-icons">
                        <i onClick={() => toggleHeart(cinema.id)}>
                          {isCinemaFavorite(cinema.id) ? <FaHeart /> : <FaRegHeart />}
                        </i>
                      </div>
                      <p className="mb-0 name">{cinema.name}</p>
                    </div>
                    <div className="movie-schedule">
                      {movieSchedules.map((schedule, index) => (
                        <div
                          key={index}
                          className="time"
                          onClick={() => handleProceedToBooking(cinema, schedule)}
                        >
                          {schedule}
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CinemaSelectionPage;