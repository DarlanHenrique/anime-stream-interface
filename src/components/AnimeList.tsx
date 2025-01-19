import React from 'react';
import { useAnimeData } from '../services/useAnimeData';
import AnimeProduction from './CarouselPage';
import Carroussel from './Carousel';
import AnimeCard from './AnimeCard';

interface AnimeListProps {
    query: string;
    limit: number;
    type: string;
    isCarroussel?: boolean;
}

const AnimeList: React.FC<AnimeListProps> = ({ query, limit, type, isCarroussel }) => {    
    const { animeDetails, error } = useAnimeData({ query, limit, type });

    if (error) return <div className="text-center text-danger mt-4">{error}</div>;

    if (isCarroussel) {
        return (
            <Carroussel key={`carroussel-${query}`}>
                {animeDetails.map((anime) => (
                    <AnimeProduction
                        key={anime.id}
                        id={anime.id}
                        name={anime.name}
                        url_image={anime.details?.url_image || ''}
                        synopsis={anime.details?.synopsis || ''}
                        mean={anime.details?.mean || 0}
                        rank={anime.details?.rank || 0}
                        popularity={anime.details?.popularity || 0}
                        genres={anime.details?.genres || []}
                        num_episodes={anime.details?.num_episodes || 0}
                        rating={anime.details?.rating || ''}
                        pictures={anime.details?.pictures || []}
                        background={anime.details?.background || ''}
                        average_episode_duration={anime.details?.average_episode_duration || 0}
                        start_date={anime.details?.start_date || ''}
                    />
                ))}
            </Carroussel>
        );
    }

    return (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-5'>
            {animeDetails.map((anime) => (
                <AnimeCard
                    key={anime.id}
                    id={anime.id}
                    name={anime.name}
                    url_image={anime.details?.url_image || ''}
                    synopsis={anime.details?.synopsis || ''}
                    mean={anime.details?.mean || 0}
                    rank={anime.details?.rank || 0}
                    popularity={anime.details?.popularity || 0}
                    genres={anime.details?.genres || []}
                    num_episodes={anime.details?.num_episodes || 0}
                    rating={anime.details?.rating || ''}
                    pictures={anime.details?.pictures || []}
                    background={anime.details?.background || ''}
                    average_episode_duration={anime.details?.average_episode_duration || 0}
                    start_date={anime.details?.start_date || ''}
                    num_list_users={anime.details?.num_list_users || 0}
                    media_type={anime.details?.media_type || ''}
                />
            ))}
        </div>
    );
};

export default AnimeList;
