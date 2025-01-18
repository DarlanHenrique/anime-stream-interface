import "../../css/AnimeProduction.css";

interface AnimeProductionProps {
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

export default function AnimeProduction({ id, name, url_image, synopsis, mean, rank, popularity, genres, num_episodes, rating, pictures, background, average_episode_duration, start_date, }: AnimeProductionProps) {

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

    let ratingLabel = getRatingLabel(rating);

    return (
        <div key={id} className="new_production -mx-4" style={{ display: "flex", height: "85vh", backgroundColor: "#00050d" }}>
            <div className="new_production_details" style={{ width: "60%" }} >

                <div className="new_name"><a href="" className="text-decoration-none text-light">{name}</a></div>
                <div className="new_details">
                    <div className="new_description text-truncate-2 pe-5">{synopsis}</div>
                </div>
                <div className="new_buttons">
                    <button className="btn btn-outline-secondary ">▶️ Play Now</button>
                    <button className="btn btn-outline-secondary rounded-full">🛈</button>
                </div>
                <div className="new_genre">
                    {genres.map((genre) => (
                        <span key={genre} className="new_genre-item">
                            <a className="me-1" href={`#${genre}`}>{genre.trim()}</a>
                        </span>
                    ))}
                </div>
            </div>
            <div className="new_production_image" style={{ backgroundImage: `url(${url_image})` }}>
                <div className="indicative-classification">
                    <span className="classification">
                        <img className="new_image_indicative" src={`./img/indicative/${ratingLabel}.png`} alt={name} />
                    </span>
                </div>
            </div>
        </div>
    );
}
