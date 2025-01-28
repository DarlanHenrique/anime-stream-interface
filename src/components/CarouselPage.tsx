
import { Link } from "react-router-dom";
import { getRatingLabel } from "../utils/utils";
import "../css/CarouselPage.css";

interface CarouselPageProps {
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
}

export default function CarouselPage({ id, name, url_image, synopsis, mean, rank, popularity, genres, num_episodes, rating, pictures, background, average_episode_duration, start_date, }: CarouselPageProps) {
    let ratingLabel = getRatingLabel(rating);

    return (
        <div key={id} className="new_production -mx-4" style={{ display: "flex", height: "85vh", backgroundColor: "#00050d" }}>
            <div className="new_production_details" style={{ width: "60%" }} >

                <div className="new_name">
                    <Link to={`/anime/${id}/${name}`} className="text-decoration-none text-light">{name}</Link>
                </div>
                <div className="new_details">
                    <div className="new_description text-truncate-2 pe-5">{synopsis}</div>
                </div>
                <div className="new_buttons">
                    <Link to={`/anime/${id}/${name}/1`} className="btn btn-outline-secondary ">▶️ Play Now</Link>
                    <Link to={`/anime/${id}/${name}`} className="btn btn-outline-secondary rounded-full">🛈</Link>
                </div>
                <div className="new_genre">
                    {genres.map((genre) => (
                        <span key={genre} className="new_genre_item">
                            <a className="me-1" href={`#${genre}`}>{genre.trim()}</a>
                        </span>
                    ))}
                </div>
            </div>
            <Link to={`/anime/${id}/${name}`} className="new_production_image" style={{ backgroundImage: `url(${url_image})` }}>
                <div className="indicative-classification">
                    <span className="classification">
                        <img className="new_image_indicative" src={`./img/indicative/${ratingLabel}.png`} alt={name} />
                    </span>
                </div>
            </Link>
        </div>
    );
}
