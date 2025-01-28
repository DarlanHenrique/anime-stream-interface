import AnimeList from "../../components/AnimeList";
import { getSeason } from "../../utils/utils";

function Home() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const season = getSeason(month);
    const getRandomNum = () => Math.floor(Math.random() * 58514);

    return (
        <>
            <AnimeList
                query={`${year}/${season}`}
                limit={6}
                type="season"
                isCarroussel
            />
            <div className="anime-list-title mt-1">
                <h2>See the animes released in the last season</h2>
                <p>
                    Get a sample of the animes released this season{" "}
                    <span>
                        <b>{getSeason(month - 3)}</b>
                    </span>{" "}
                    of <b>{season === "winter" ? year - 1 : year}</b>
                </p>
            </div>
            <AnimeList
                query={`${season === "winter" ? year - 1 : year
                    }/${getSeason(month - 3)}`}
                limit={15}
                type="season"
                carruselId="LastSeasonCarousel"
            />
            <AnimeList
                query={getRandomNum().toString()}
                limit={0}
                type="anime"
                isAnime
            />
            <div className="anime-list-title mt-1">
                <h2>Animes recommended for you</h2>
                <p>We have a selection of the best anime for you to watch</p>
            </div>
            <AnimeList
                query=""
                limit={15}
                type="ranking"
                carruselId="RecommendedCarousel"
            />
        </>

    );
}

export default Home;
