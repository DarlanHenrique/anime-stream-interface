import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import "../../css/Production.css";
import { Anime, MyAnimeListResponse, fetchAnimeList } from "../../services/myAnimeListResponse";

interface ProductionProps {
    id: number;
}

export default function Production({ id }: ProductionProps) {

    const [anime, setAnime] = useState<Anime[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: MyAnimeListResponse = await fetchAnimeList(id.toString(), 0, 'anime');
                setAnime(response.results);
            } catch (err) {
                setError('Erro ao carregar os animes');
            }
        };

        fetchData();
    }, []);


    function getClassificationLabel(classification: number): string {
        let classificationLabel: string;
        switch (classification) {
            case 0:
                classificationLabel = "free";
                break;
            case 10:
                classificationLabel = "ten_years";
                break;
            case 12:
                classificationLabel = "twelve_years";
                break;
            case 14:
                classificationLabel = "fourteen_years";
                break;
            case 16:
                classificationLabel = "sixteen_years";
                break;
            case 18:
                classificationLabel = "eighteen_years";
                break;
            default:
                classificationLabel = "free";
                break;
        }
        return classificationLabel;
    }

    let classificationLabel = anime[0] && anime[0].rating !== undefined ? getClassificationLabel(Number(anime[0].rating)) : "free";
    { error && <p>{error}</p> }
    console.log(anime);
    
    return (
        <>
            {anime.map((anime) => (
                <div className="production" key={anime.id}>
                    <div className="details">
                        <div className="name">{anime.name}</div>
                        <div className="description">{anime.synopsis}</div>
                        <div className="type">anime</div>
                        <div className="year">{anime.start_date}</div>
                        <div className="length">{anime.episodes} episódios</div>
                        <div className="genre ">
                            {anime.genres.map((genreItem) => (
                                <span key={genreItem} className="genre-item">
                                    <a className="me-1" href={`#${genreItem}`}>{genreItem.trim()}</a>
                                </span>
                            ))}
                        </div>
                        <div className="indicative-classification">
                            <span className="classification">
                                <img className="image_indicative " src={`./img/indicative/${classificationLabel}.png`} alt={anime.title} />
                            </span>
                        </div>
                    </div>
                </div>
            ))}


            <div className="production">
                {/* <div className="details">
                <div className="name">{name}</div>
                <div className="description">{description}</div>
                <div className="type">{type}</div>
                <div className="year">{year}</div>
                <div className="length">{length}{type === "filme" || type === "documentário" ? " min" : " episódios"}</div>
                <div className="genre ">
                    {genre.map((genreItem) => (
                        <span key={genreItem} className="genre-item">
                            <a className="me-1" href={`#${genreItem}`}>{genreItem.trim()}</a>
                        </span>
                    ))}
                </div>
                <div className="indicative-classification">
                    <span className="classification">
                        <img className="image_indicative " src={`./img/indicative/${classificationLabel}.png`} alt={name} />
                    </span>
                </div>
            </div> */}
            </div>
        </>
    );
}