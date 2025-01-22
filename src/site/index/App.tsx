import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimeList from '../../components/AnimeList';
import { useState } from 'react';

function App() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const season = getSeason(month);
  const getRandomNum = () => Math.floor(Math.random() * 58514);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function getSeason(month: number): string {
    if (month >= 1 && month <= 3) return 'winter';
    else if (month >= 4 && month <= 6) return 'spring';
    else if (month >= 7 && month <= 9) return 'summer';
    else return 'fall';
  }

  const resetToInitialState = () => {
    setIsSearchActive(false);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setIsSearchActive(true);
    setSearchQuery(query);
  };

  return (
    <div>
      <header className="mb-5">
        <Navbar onHomeClick={resetToInitialState} onSearch={handleSearch} />
      </header>
      <div className="top-space" />
      <main>
        {!isSearchActive ? (
          <>
            {/* Conteúdo inicial */}
            <AnimeList
              query={`${year}/${season}`}
              limit={6}
              type="season"
              isCarroussel
            />
            <div className="anime-list-title mt-1">
              <h2>See the animes released in the last season</h2>
              <p>
                Get a sample of the animes released this season{' '}
                <span>
                  <b>{getSeason(month - 3)}</b>
                </span>{' '}
                of <b>{season === 'winter' ? year - 1 : year}</b>
              </p>
            </div>
            <AnimeList
              query={`${
                season === 'winter' ? year - 1 : year
              }/${getSeason(month - 3)}`}
              limit={15}
              type="season"
              carruselId="LastSeasonCarousel"
            />
            <AnimeList
              query={getRandomNum().toString()}
              limit={0}
              type="anime"
              isAnime
            />
            <div className="anime-list-title mt-1">
              <h2>Animes recommended for you</h2>
              <p>We have a selection of the best anime for you to watch</p>
            </div>
            <AnimeList
              query=""
              limit={15}
              type="ranking"
              carruselId="RecommendedCarousel"
            />
          </>
        ) : (
          <>
            {/* Resultados da busca */}
            <div className="anime-list-title mt-1">
              <h2>Results for "{searchQuery}"</h2>
              <p>Here are the best results for your search</p>
            </div>
            <AnimeList
              query={searchQuery}
              limit={50}
              type="list"
              carruselId={`search${searchQuery}`}
            />
          </>
        )}
      </main>
      <Footer year={year} />
    </div>
  );
}

export default App;
