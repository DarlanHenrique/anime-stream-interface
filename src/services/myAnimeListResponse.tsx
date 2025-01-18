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

const fetchFromApi = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'X-MAL-CLIENT-ID': CLIENT_ID,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }

  return response.json();
};

const transformAnimeData = (data: any): Anime => ({
  id: data.node.id,
  name: data.node.title,
});

const transformAnimeDetails = (data: any): AnimeWithDetails => ({
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
  details: null,
});

export const fetchAnimeList = async <T extends Anime | AnimeWithDetails>(query: string, limit: number, type: string): Promise<{ results: T[] }> => {
  let endpoint = '';
  let transformFunction = transformAnimeData;

  switch (type) {
    case 'list':
      endpoint = `?q=${query}&limit=${limit}`;
      break;
    case 'ranking':
      endpoint = `/ranking?ranking_type=all&limit=${limit}`;
      break;
    case 'season':
      endpoint = `/season/${query}?limit=${limit}&anime_score&airing`;
      break;
    case 'anime':
      endpoint = `/${query}?fields=id,title,main_picture,synopsis,mean,rank,popularity,genres,num_episodes,rating,pictures,background,average_episode_duration,start_date`;
      transformFunction = transformAnimeDetails;
      break;
    default:
      throw new Error('Tipo de consulta inválido');
  }

  try {
    const data = await fetchFromApi(endpoint);
    const transformedData = {
      results: Array.isArray(data.data) ? data.data.map(transformFunction) : [transformFunction(data)],
    };

    return transformedData as { results: T[] };
  } catch (error) {
    console.error(`Erro ao buscar animes (${type}):`, error);
    throw error;
  }
};
