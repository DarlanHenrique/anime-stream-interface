import React, { useState } from 'react';
import { useAnimeData } from '../services/useAnimeData';
import AnimeProduction from './CarouselPage';
import Carroussel from './Carousel';
import AnimeCard from './AnimeCard';
import LoadingSpinner from './LoadingSpinner';


interface AnimeListProps {
    query: string;
    limit: number;
    type: string;
    isCarroussel?: boolean;
    carruselId?: string;
    isAnime?: boolean;
}
const AnimeList: React.FC<AnimeListProps> = ({ query, limit, type, isCarroussel, carruselId, isAnime }) => {
    const { animeDetails, error, loading } = useAnimeData({ query, limit, type });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const visibleAnimes = animeDetails.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < animeDetails.length)
            setCurrentPage(prev => prev + 1);
    };
    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(prev => prev - 1);
    };

    if (error) return <div className="text-center text-danger mt-4">{error}</div>;

    if (loading) return <LoadingSpinner />;

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
    if (isAnime) {
        return (
            <>
                {animeDetails.map((anime) => (
                    <AnimeProduction
                        key={anime.id}
                        id={anime.id}
                        name={anime.name}
                        url_image={anime.url_image || ''}
                        synopsis={anime.synopsis || ''}
                        mean={anime.mean || 0}
                        rank={anime.rank || 0}
                        popularity={anime.popularity || 0}
                        genres={anime.genres || []}
                        num_episodes={anime.num_episodes || 0}
                        rating={anime.rating || ''}
                        pictures={anime.pictures || []}
                        background={anime.background || ''}
                        average_episode_duration={anime.average_episode_duration || 0}
                        start_date={anime.start_date || ''}
                    />))}
            </>
        );
    }

    return (
        <div className="anime-list-container carousel" id={carruselId} data-bs-ride="carousel">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 carousel-inner">
                {visibleAnimes.map((anime) => (
                    <div className="col" key={anime.id}>
                        <AnimeCard
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
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between mt-3">
                {currentPage > 0 && (
                    <button
                        className="carousel-control-prev -ms-8 new_carrousel_button"
                        type="button"
                        data-bs-target={carruselId}
                        data-bs-slide="prev"
                        onClick={prevPage}
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                )}

                {(currentPage + 1) * itemsPerPage < animeDetails.length && (
                    <button
                        className="carousel-control-next -me-8 new_carrousel_button"
                        type="button"
                        data-bs-target={carruselId}
                        data-bs-slide="next"
                        onClick={nextPage}
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default AnimeList;
