import "../css/AnimeCard.css";
import { CSSProperties } from "react";

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

export default function AnimeCard({ id, name, url_image, synopsis, mean, rank, popularity, genres, num_episodes, rating, pictures, background, average_episode_duration, start_date, num_list_users, media_type, }: AnimeCardProps) {

    const styles = {
        "--background-image": `url(${url_image})`
    } as CSSProperties;

    let ratingLabel = getRatingLabel(rating);

    function getRatingLabel(rating: string): string {
        let ratingLabel: string;
        switch (rating) {
            case "g":
                ratingLabel = "free";
                break;
            case "pg":
                ratingLabel = "ten_years";
                break;
            case "pg_13":
                ratingLabel = "twelve_years";
                break;
            case "r":
                ratingLabel = "fourteen_years";
                break;
            case "r+":
                ratingLabel = "sixteen_years";
                break;
            case "rx":
                ratingLabel = "eighteen_years";
                break;
            default:
                ratingLabel = "free";
                break;
        }
        return ratingLabel;
    }

    function formatNumber(num: number): string {
        if (num >= 1_000_000) {
            return `${(num / 1_000_000).toFixed(1).replace('.0', '')}M`;
        } else if (num >= 1_000) {
            return `${(num / 1_000).toFixed(1).replace('.0', '')}k`;
        }
        return num.toString();
    }

    return (
        <div key={id} className="anime_production position-relative">
            <div className="anime_production_image_wrapper">
                <img className="anime_production_image img-fluid" src={url_image} alt={name} />
                <div className="anime_production_text">
                    <span className="anime_production_name text-center">{name}</span>
                </div>
            </div>
            <a href="" className="anime_production_details text-decoration-none text-white text-start">
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
                <a href="" className="text-decoration-none position-absolute bottom-0 start-0" title="Watch the 1st episode.">▶️</a>
            </a>
        </div>

    );
}
