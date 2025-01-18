import { useState, useEffect } from 'react';
import { fetchAnimeList, MyAnimeListResponse, Anime, AnimeWithDetails } from './myAnimeListResponse';

interface UseAnimeDataProps {
  query: string;
  limit: number;
  type: string;
}

export const useAnimeData = ({ query, limit, type }: UseAnimeDataProps) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [animeDetails, setAnimeDetails] = useState<AnimeWithDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState<boolean>(false); 
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingList(true); 
        const response: MyAnimeListResponse = await fetchAnimeList(query, limit, type);
        setAnimeList(response.results);
      } catch (err) {
        setError('Erro ao carregar os animes');
      } finally {
        setLoadingList(false); 
      }
    };

    fetchData();
  }, [query, limit, type]);

  const fetchAnimeDetails = async (id: number) => {
    try {
      const response: MyAnimeListResponse = await fetchAnimeList(id.toString(), 0, 'anime');
      const anime = response.results[0];
      if (anime) {
        return {
          ...anime,
          average_episode_duration: anime.average_episode_duration || 0,
          background: anime.background || '',
          genres: anime.genres || [],
          id: anime.id,
          mean: anime.mean || 0,
          name: anime.name,
          num_episodes: anime.num_episodes || 0,
          pictures: anime.pictures || [],
          popularity: anime.popularity || 0,
          rank: anime.rank || 0,
          rating: anime.rating || '',
          start_date: anime.start_date || '',
          synopsis: anime.synopsis || '',
          url_image: anime.url_image || '',
        };
      }
      return null;
    } catch (err) {
      setError('Erro ao carregar os detalhes do anime');
      return null;
    }
  };

  useEffect(() => {
    const getAnimeDetails = async () => {
      if (animeList.length === 0) return; 

      const details: AnimeWithDetails[] = [];
      setLoadingDetails(true); 

      for (let anime of animeList) {
        const detail = await fetchAnimeDetails(anime.id);
        details.push({
          id: anime.id,
          name: anime.name,
          details: detail || null,
          url_image: '',
          synopsis: '',
          mean: 0,
          rank: 0,
          popularity: 0,
          genres: [],
          num_episodes: 0,
          rating: '',
          pictures: [],
          background: '',
          average_episode_duration: 0,
          start_date: '',
        });
      }

      setAnimeDetails(details);
      setLoadingDetails(false); 
    };

    getAnimeDetails();
  }, [animeList]);

  const loading = loadingList || loadingDetails;

  return { animeList, animeDetails, error, loading };
};
