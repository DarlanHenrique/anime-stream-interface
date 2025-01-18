import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Carroussel from '../../components/Carroussel';
import AnimeProduction from './AnimeProduction';
import { useAnimeData } from '../../services/useAnimeData';
import LoadingSpinner from '../../components/LoadingSpinner';

function App() {
  const { animeDetails, error, loading } = useAnimeData({query: '2024/winter', limit: 4, type: 'season',});

  if (loading) 
    return <LoadingSpinner />;

  if (error) 
    return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <div>
      <header className="mb-5">
        <Navbar />
      </header>
      <div className="top-space" />
      <main>
        <Carroussel key="new-carroussel">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
