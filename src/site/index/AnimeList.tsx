import { useEffect, useState } from 'react';
import { fetchAnimeList, MyAnimeListResponse, Anime } from '../../services/myAnimeListResponse';

const MyAnimeListComponent = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: MyAnimeListResponse = await fetchAnimeList();
        
        setAnimeList(response.results);
      } catch (err) {
        setError('Erro ao carregar os animes');
      }
    };

    fetchData();
  }, []); 


 console.log(animeList);
 
  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {animeList.map((anime, index) => (
          <li key={index}>
              {anime.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAnimeListComponent;
