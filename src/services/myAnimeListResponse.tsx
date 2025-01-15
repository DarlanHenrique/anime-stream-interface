const BASE_URL = '/api/v2/anime';
const CLIENT_ID = 'e59d4d433da1eb9ba473355ee48b91f9';

export interface Anime {
  id: number;
  name: string;
  url_image: string;
}

export interface MyAnimeListResponse {
  results: Anime[];
}

export const fetchAnimeList = async (id: number = 1015, query: string = 'ranking_type', limit: number = 4): Promise<MyAnimeListResponse> => {
// https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=4
// https://api.myanimelist.net/v2/anime?q=one&limit=4
// https://api.myanimelist.net/v2/anime/30230?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics


  try {
    // const response = await fetch(`${BASE_URL}?q=${query}&limit=${limit}`, {
    // const response = await fetch(`${BASE_URL}/ranking?${query}=all&&limit=${limit}`, {
    const response = await fetch(`${BASE_URL}/ranking?${query}=all&&limit=${limit}`, {
      headers: {
        'X-MAL-CLIENT-ID': CLIENT_ID,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();

    // Transformando os dados para o formato esperado
    const transformedData: MyAnimeListResponse = {
      results: data.data.map((anime: any) => ({
        id: anime.node.id,
        name: anime.node.title,
        url_image: anime.node.main_picture.medium,
      })),
    };

    return transformedData;
  } catch (error) {
    console.error('Erro ao buscar animes:', error);
    throw error;
  }
};
