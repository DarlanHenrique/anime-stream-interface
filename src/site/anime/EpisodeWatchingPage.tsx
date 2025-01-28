import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";
import { formatNumber, getRatingLabel } from "../../utils/utils";
import { useAnimeData } from "../../services/useAnimeData";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../css/EpisodeWatchingPage.css";
import "../../css/AnimeDetailsPage.css";

export default function EpisodeWatchingPage() {
    const { id, index } = useParams<{ id: string; index: string }>();
    const { animeDetails, error, loading } = useAnimeData({ query: id || "", limit: 0, type: "anime", });
    const anime = animeDetails && animeDetails.length > 0 ? animeDetails[0] : null;
    const ratingLabel = anime ? getRatingLabel(anime.rating || "") : "free";
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);

    if (error) return <div className="error-message">{error}</div>;
    if (loading) return <LoadingSpinner />;
    if (!anime) return <div className="error-message">Anime not found.</div>;

    return (
        <div className="episode-container">
            <div className="video-section">
                <div className="container-episode">
                    <iframe
                        width="885"
                        height="498"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                    <div className="episode-navigation mt-3">
                        <div className={`nav-button-wrapper ${index === "1" ? "invisible" : ""}`}>
                            <Link
                                to={`/anime/${id}/${anime.name}/${index ? parseInt(index) - 1 : 0}`}
                                className="nav-button d-flex align-items-center"
                            >
                                <span className="arrow">&lt;</span> Episode {index ? parseInt(index) - 1 : "N/A"}
                            </Link>
                        </div>

                        <Link to={`/anime/${id}/${anime.name}`} className="episode-label">
                            <span className="custom-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </Link>

                        <div className={`nav-button-wrapper ${index === anime.num_episodes?.toString() ? "invisible" : ""}`}>
                            <Link
                                to={`/anime/${id}/${anime.name}/${index ? parseInt(index) + 1 : 0}`}
                                className="nav-button d-flex align-items-center"
                            >
                                Episode {index ? parseInt(index) + 1 : "N/A"} <span className="arrow">&gt;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="anime-details mt-4">
                <h1 className="text-start anime-title">
                    <Link to={`/anime/${id}/${anime.name}`} className="anime-link">{anime.name} </Link>
                    <span className="rating-info">
                        | Average Rating: {anime.mean ? anime.mean.toFixed(2) : "N/A"} ({anime.num_list_users ? formatNumber(anime.num_list_users) : "0"})
                    </span>
                </h1>
                <div className="details-row">
                    <span className="episode-number">Episode {index}</span>
                    <img
                        className="rating-icon"
                        src={`/anime-stream-interface/public/img/indicative/${ratingLabel}.png`}
                        alt={`${ratingLabel} classification`}
                    />
                </div>
                <div className="row">
                    <div className="anime-synopsis col-6">
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
                    <div className="col-6">
                        <section className="anime-section details">
                            <h2 className="mb-3">Details</h2>
                            <div className="details-list">
                                <p>
                                    <strong>Episode Release Date:</strong>
                                    {anime.start_date
                                        ? new Date(
                                            new Date(anime.start_date).setDate(
                                                new Date(anime.start_date).getDate() + (index ? (parseInt(index) - 1) * 7 : 0)
                                            )
                                        ).toLocaleDateString()
                                        : "N/A"}
                                </p>
                                <p><strong>Episode Duration:</strong> {anime.average_episode_duration ? `${Math.round(anime.average_episode_duration / 60)} minutes` : "N/A"}</p>
                                <p><strong>Popularity:</strong> {anime.popularity}</p>
                                <p><strong>Rank:</strong> {anime.rank}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <section className="anime-section details">
                <h2 className="mb-4">Comments</h2>
                <DiscussionEmbed
                    shortname="anime-stream-interface"
                    config={{
                        url: window.location.href,
                        identifier: id,
                        title: anime.name,
                        language: "pt-BR",
                    }}
                />
            </section>
        </div>
    );
}
