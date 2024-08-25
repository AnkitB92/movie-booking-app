import { Link } from "react-router-dom";
import cake_icon from '../../../images/cake.png';
import tomato_icon from '../../../images/tomato.png';
import './Movie.css';



const Movie = ({data}) => {
  const { id, title, poster, tomato_meter, audience_meter } = data;

  return (
    <div className="col-12 col-sm-6 col-md-3 mb-4">
      <div className="movie-card">

        <Link to={`/${id}`} className="movie-poster-container"><img src={poster} alt=".." /></Link>

        <div className="card-body">
          <h5 className="card-title"><Link to={`/${id}`}>{title}</Link></h5>
          <div className="w-100 top-border"></div>
          <div className="rating-percent">
            <div className="rating">
              <img src={tomato_icon} alt="tomato" />
              <span>{tomato_meter}%</span>
            </div>
            <div className="rating">
              <img src={cake_icon} alt="cake" />
              <span>{audience_meter}%</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Movie;
