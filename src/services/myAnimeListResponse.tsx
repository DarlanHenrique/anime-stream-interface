const BASE_URL = '/api/v2/anime';
const CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;
console.log(CLIENT_ID);

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
  num_list_users?: number;
  media_type?: string;
}

export interface AnimeWithDetails extends Anime {
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

const transformAnimeDetails = (data: any): Anime => ({
  id: data.id,
  name: data.title,
  url_image: data.main_picture?.large || '',
  synopsis: data.synopsis || 'Sem sinopse disponível.',
  mean: data.mean || 0,
  rank: data.rank || 0,
  popularity: data.popularity || 0,
  genres: data.genres?.map((genre: any) => genre.name) || [],
  num_episodes: data.num_episodes || 0,
  rating: data.rating || 'Não especificado',
  pictures: data.pictures?.map((pic: any) => pic.large) || [],
  background: data.background || 'Sem informações adicionais.',
  average_episode_duration: data.average_episode_duration || 0,
  start_date: data.start_date || 'Data não informada.',
  num_list_users: data.num_list_users || 0,
  media_type: data.media_type || 'Não especificado',
});

export const fetchAnimeList = async <T extends Anime | AnimeWithDetails>(
  query: string,
  limit: number,
  type: string
): Promise<{ results: T[] }> => {
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
      endpoint = `/${query}?fields=id,title,main_picture,synopsis,mean,rank,popularity,genres,num_episodes,rating,pictures,background,average_episode_duration,start_date,num_list_users,media_type`;
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
    if (type === 'anime' && error instanceof Error && error.message.includes('404')) {
      try {
        const fallbackEndpoint = `/30?fields=id,title,main_picture,synopsis,mean,rank,popularity,genres,num_episodes,rating,pictures,background,average_episode_duration,start_date,num_list_users,media_type`;
        const fallbackData = await fetchFromApi(fallbackEndpoint);
        const transformedFallbackData = {
          results: [transformFunction(fallbackData)],
        };
        return transformedFallbackData as { results: T[] };
      } catch (fallbackError) {
        throw fallbackError;
      }
    } else {
      throw error;
    }
  }
};