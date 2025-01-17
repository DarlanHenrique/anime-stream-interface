const BASE_URL = '/api/v2/anime';
const CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;

export interface Anime {
  id: number;
  name: string;
}

export interface MyAnimeListResponse {
  results: Anime[];
}

export const fetchAnimeList = async (query: string = 'one', limit: number = 4): Promise<MyAnimeListResponse> => {
// https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=4
// https://api.myanimelist.net/v2/anime?q=one&limit=4
// https://api.myanimelist.net/v2/anime/30230?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics
// https://api.myanimelist.net/v2/anime/season/2017/summer?limit=4


  const method = `?q=${query}&limit=${limit}`
  try {

    //ANIME LIST COM NOME: ?q=${query}&limit=${limit}`, {
    //RANKING GERAL: /ranking?${query}=all&&limit=${limit}`, {
    //RANKING GERAL: /season/{year}/{season}?limit=4`, {
    const response = await fetch(`${BASE_URL}${method}`, {
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
        url_image: anime.node.main_picture.large,
      })),
    };

    return transformedData;
  } catch (error) {
    console.error('Erro ao buscar animes:', error);
    throw error;
  }
};
