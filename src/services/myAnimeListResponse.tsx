const BASE_URL = '/api/v2/anime';
const CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;
export interface Anime {
  id: number;
  name: string;
  url_image?: string;
  synopsis?: string;
  mean?: number;
  rank?: number;
  popularity?: number;
  genres?: string[];
  num_episodes?: number;
  rating?: string;
  pictures?: string[];
  background?: string;
  average_episode_duration?: number;
  start_date?: string;
}
export interface AnimeWithDetails extends Anime {
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
  details: Anime | null;
}

export interface MyAnimeListResponse {
  results: Anime[];
  type?: string;
}

export const fetchAnimeList = async <T extends Anime | AnimeWithDetails>(
  query: string,
  limit: number,
  type: string
): Promise<{ results: T[] }> => {
  switch (type) {
    case 'list': {
      const method = `?q=${query}&limit=${limit}`;
      try {
        const response = await fetch(`${BASE_URL}${method}`, {
          headers: {
            'X-MAL-CLIENT-ID': CLIENT_ID,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        const transformedData = {
          results: data.data.map((anime: any) => ({
            id: anime.node.id,
            name: anime.node.title,
          })) as T[],
        };

        return transformedData;
      } catch (error) {
        console.error('Erro ao buscar animes:', error);
        throw error;
      }
    }

    case 'ranking': {
      const method = `/ranking?ranking_type=all&limit=${limit}`;
      try {
        const response = await fetch(`${BASE_URL}${method}`, {
          headers: {
            'X-MAL-CLIENT-ID': CLIENT_ID,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        const transformedData = {
          results: data.data.map((anime: any) => ({
            id: anime.node.id,
            name: anime.node.title,
          })) as T[],
        };

        return transformedData;
      } catch (error) {
        console.error('Erro ao buscar animes no ranking:', error);
        throw error;
      }
    }

    case 'season': {
      const method = `/season/${query}?limit=${limit}&anime_score&airing`;
      try {
        const response = await fetch(`${BASE_URL}${method}`, {
          headers: {
            'X-MAL-CLIENT-ID': CLIENT_ID,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        const transformedData = {
          results: data.data.map((anime: any) => ({
            id: anime.node.id,
            name: anime.node.title,
          })) as T[],
        };

        return transformedData;
      } catch (error) {
        console.error('Erro ao buscar animes da temporada:', error);
        throw error;
      }
    }

    case 'anime': {
      const method = `/${query}?fields=id,title,main_picture,synopsis,mean,rank,popularity,genres,num_episodes,rating,pictures,background,average_episode_duration,start_date`;
      try {
        const response = await fetch(`${BASE_URL}${method}`, {
          headers: {
            'X-MAL-CLIENT-ID': CLIENT_ID,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        const transformedData = {
          results: [
            {
              id: data.id,
              name: data.title,
              url_image: data.main_picture.large,
              synopsis: data.synopsis,
              mean: data.mean,
              rank: data.rank,
              popularity: data.popularity,
              genres: data.genres.map((genre: any) => genre.name),
              num_episodes: data.num_episodes,
              rating: data.rating,
              pictures: data.pictures.map((picture: any) => picture.large),
              background: data.background,
              average_episode_duration: data.average_episode_duration,
              start_date: data.start_date,
            },
          ] as T[],
        };

        return transformedData;
      } catch (error) {
        console.error('Erro ao buscar anime:', error);
        throw error;
      }
    }

    default:
      throw new Error('Tipo de consulta inválido');
  }
};

