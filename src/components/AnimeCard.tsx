import { Link } from "react-router-dom";
import { getRatingLabel, formatNumber } from "../utils/utils";
import "../css/AnimeCard.css";

interface AnimeCardProps {
    id: number;
    name: string;
    url_image: string;
    synopsis: string;
    mean: number;
    rank: number;
    popularity: number;
    genres: string[];
    num_episodes: number;
    rating: string;
    pictures: string[];
    background: string;
    average_episode_duration: number;
    start_date: string;
    num_list_users: number;
    media_type: string;
}

export default function AnimeCard({ id, name, url_image, synopsis, mean, genres, num_episodes, rating, num_list_users, }: AnimeCardProps) {

    let ratingLabel = getRatingLabel(rating);

    return (
        <div key={id} className="anime_production position-relative">
            <div className="anime_production_image_wrapper">
                <img className="anime_production_image img-fluid" src={url_image} alt={name} />
                <div className="anime_production_text">
                    <span className="anime_production_name text-center">{name}</span>
                </div>
            </div>
            <Link to={`/anime/${id}/${name}`} className="anime_production_details text-decoration-none text-white text-start">
                <span className="anime_production_name text-justify mb-1">{name}</span>
                <div className="row">
                    <span className="classification col-3 d-flex justify-content-center">
                        <img className="anime_image_indicative" src={`./img/indicative/${ratingLabel}.png`} alt={name} />
                    </span>
                    <span className="anime_production_mean col-3">{mean}⭐</span>
                    <span className="anime_production_list_users col-3 ms-3">({formatNumber(num_list_users)})</span>
                </div>
                <div className="anime_production_num_episodes mt-1">{num_episodes === 0 ? "undefined" : `${num_episodes} ${num_episodes === 1 ? "episode" : "episodes"}`}</div>
                <div className="anime_production_description mt-1">{synopsis}</div>
                <div className="anime_genre">
                    {genres.map((genre) => (
                        <span key={genre} className="anime_genre_item me-1"><u>{genre.trim()}</u></span>
                    ))}
                </div>
                <Link to={`/anime/${id}/${name}/1`} className="text-decoration-none position-absolute bottom-0 start-0" title="Watch the 1st episode.">▶️</Link>
            </Link>
        </div>

    );
}
