import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnimeData } from '../../services/useAnimeData';
import LoadingSpinner from '../../components/LoadingSpinner';
import { formatNumber, getRatingLabel, getStarRating } from "../../utils/utils";
import "../../css/AnimeDetailsPage.css";
import "../../css/EpisodeWatchingPage.css";

function AnimeDetailsPage() {

    const { id } = useParams<{ id: string }>();
    const { animeDetails, error, loading } = useAnimeData({ query: id || '', limit: 0, type: "anime" });
    const anime = animeDetails && animeDetails.length > 0 ? animeDetails[0] : null;
    const ratingLabel = anime ? getRatingLabel(anime.rating || "") : "free";
    const starRating = anime ? getStarRating(anime.mean || 0) : 0;

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const visiblePictires = anime?.pictures?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);

    const nextPage = () => {
        if (anime && anime.pictures && (currentPage + 1) * itemsPerPage < anime.pictures.length)
            setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (anime && currentPage > 0)
            setCurrentPage(prev => prev - 1);
    };


    if (error) return <div className="text-center text-danger mt-4">{error}</div>;
    if (loading) return <LoadingSpinner />;
    if (!anime) return <div className="text-center text-warning mt-4">Anime not found.</div>;

    return (
        <div className="anime-details-page" key={anime.id}>
            {/* Banner */}
            <div className="anime-banner" style={{ backgroundImage: `url(${anime.url_image})` }}>
                <div className="overlay">
                    <h1 className="anime-title">{anime.name}</h1>
                    <div className="indicative-classification d-flex align-items-center">
                        <span className="classification">
                            <img
                                className="anime-image-indicative"
                                src={`/anime-stream-interface/public/img/indicative/${ratingLabel}.png`}
                                alt={`${ratingLabel} classification`}
                            />
                        </span>
                        <span className="anime-summary">
                            <u>{anime.genres ? anime.genres.join(", ") : "N/A"}</u>
                        </span>
                    </div>
                    <div className="rating-and-score mt-2">
                        {/* Estrelas da Nota */}
                        <span className="star-rating">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <i
                                    key={index}
                                    className={`star-icon ${index + 1 <= Math.round(starRating) ? 'filled' : ''}`}
                                    style={{ color: index + 1 <= Math.round(starRating) ? 'gold' : '#ccc' }}
                                >
                                    ★
                                </i>
                            ))}
                        </span>
                        {/* Nota Média e Número de Usuários */}
                        <span className="note-details">
                            | Average rating: {anime.mean ? anime.mean.toFixed(2) : "N/A"} (
                            {anime.num_list_users ? formatNumber(anime.num_list_users) : "0"})
                        </span>
                    </div>
                    {/* Botão "Comece a Assistir" */}
                    <div className="mt-3 text-center">
                        <Link
                            to={`/anime/${id}/${anime.name}/1`}
                            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                backgroundColor: "#ff9900",
                                border: "none",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "50px",
                                transition: "transform 0.2s, background-color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#cc7a00")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff9900")}
                        >
                            <i className="bi bi-play-circle-fill" style={{ fontSize: "1.5rem", color: "#fff", }}></i>
                            Start watching
                        </Link>
                    </div>

                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="anime-main-content">
                <div className="row">
                    {/* Sinopse */}
                    <div className="col-md-6">
                        <section className="anime-section synopsis">
                            <h2 className="mb-3">Synopsis</h2>
                            <div className={`synopsis-text ${showFullSynopsis ? "expanded" : ""}`}>

                                <p className="text-white">{anime.synopsis}</p>
                            </div>
                            {anime.synopsis && anime.synopsis.split(" ").length > 30 && (
                                <button
                                    className="btn btn-outline-light mt-2"
                                    onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                                >
                                    {showFullSynopsis ? "Veja menos" : "Veja mais"}
                                </button>
                            )}
                        </section>
                    </div>

                    {/* Detalhes */}
                    <div className="col-md-6">
                        <section className="anime-section details">
                            <h2 className="mb-3">Details</h2>
                            <div className="details-list">
                                <p><strong>Start Date:</strong> {anime.start_date ? new Date(anime.start_date).toLocaleDateString() : "N/A"}</p>
                                <p><strong>Average Episode Duration:</strong> {anime.average_episode_duration ? `${Math.round(anime.average_episode_duration / 60)} minutes` : "N/A"}</p>
                                <p><strong>Popularity:</strong> {anime.popularity}</p>
                                <p><strong>Rank:</strong> {anime.rank}</p>
                            </div>
                        </section>
                    </div>
                </div>
                {/* Episódios */}
                <section className="anime-section episodes">
                    <h2>Episodes</h2>
                    <div className="episodes-grid">
                        {Array.from({ length: anime.num_episodes || 0 }).map((_, index) => (
                            <Link to={`/anime/${id}/${anime.name}/${index + 1}`} key={index} className="episode-card">
                                <div className="episode-image-wrapper">
                                    <img
                                        src={anime.pictures?.[0] || anime.url_image}
                                        alt={`Episode ${index + 1}`}
                                        className="episode-image"
                                    />
                                    <div className="episode-overlay">
                                        <h3 className="episode-number">Episode {index + 1}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Galeria */}
                <section className="anime-section gallery">
                    <h2>Gallery</h2>
                    <div className="anime-list-container carousel" id={`AnimeCarousselPicture_${anime.id}`} data-bs-ride="carousel">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 carousel-inner">
                            {visiblePictires?.map((pic, index) => (
                                <div className="col">
                                    <img key={pic} src={pic} alt={`Gallery ${index}`} className="gallery-image" />
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            {currentPage > 0 && (
                                <button
                                    className="carousel-control-prev -ms-8 new_carrousel_button"
                                    type="button"
                                    data-bs-target={`AnimeCarousselPicture_${anime.id}`}
                                    data-bs-slide="prev"
                                    onClick={prevPage}
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                            )}

                            {(anime.pictures && (currentPage + 1) * itemsPerPage < anime.pictures.length) && (
                                <button
                                    className="carousel-control-next -me-8 new_carrousel_button"
                                    type="button"
                                    data-bs-target={`AnimeCarousselPicture_${anime.id}`}
                                    data-bs-slide="next"
                                    onClick={nextPage}
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}

export default AnimeDetailsPage;
