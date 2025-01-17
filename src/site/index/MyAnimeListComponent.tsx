import { useEffect, useState } from 'react';
import { fetchAnimeList, MyAnimeListResponse, Anime } from '../../services/myAnimeListResponse';
import AnimeProduction from './Anime';

const MyAnimeListComponent = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: MyAnimeListResponse = await fetchAnimeList('2025/spring', 2, 'season');
                setAnimeList(response.results);
            } catch (err) {
                setError('Erro ao carregar os animes');
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {animeList.map((anime) => (
                    <li key={anime.id}>
                        <AnimeProduction id={anime.id}></AnimeProduction>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyAnimeListComponent;
