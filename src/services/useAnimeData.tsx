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

  const fetchAnimeDetails = async (id: number): Promise<Anime | null> => {
    try {
      const response = await fetchAnimeList(id.toString(), 0, 'anime');
      return response.results[0] || null;
    } catch (err) {
      setError('Erro ao carregar os detalhes do anime');
      return null;
    }
  };

  useEffect(() => {
    const getAnimeDetails = async () => {
      if (animeList.length === 0) return;

      setLoadingDetails(true);

      try {
        const details = await Promise.all(
          animeList.map(async (anime) => {
            const detail = await fetchAnimeDetails(anime.id);
            return {
              ...anime,
              details: detail,
            } as AnimeWithDetails;
          })
        );
        setAnimeDetails(details);
      } catch (err) {
        setError('Erro ao carregar os detalhes dos animes');
      } finally {
        setLoadingDetails(false);
      }
    };

    getAnimeDetails();
  }, [animeList]);

  const loading = loadingList || loadingDetails;

  return { animeList, animeDetails, error, loading };
};
