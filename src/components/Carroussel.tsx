
import React from "react";
import "../css/Carroussel.css";

interface CarrousselProps {
    children: React.ReactNode;
}

export default function Carroussel({ children: animes }: CarrousselProps) {
    const animeArray = React.Children.toArray(animes);

    return (
        <>
            <div className="category mt-5">
                <div id="NewAnimeCarroussel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {animeArray.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#NewAnimeCarroussel"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {animeArray.map((anime, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={React.isValidElement(anime) ? anime.props.name : index}>
                                {anime}
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-control-prev -ms-8 new_carrousel_button"
                        type="button"
                        data-bs-target="#NewAnimeCarroussel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next -me-8 new_carrousel_button"
                        type="button"
                        data-bs-target="#NewAnimeCarroussel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )

}
