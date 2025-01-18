import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimeList from '../../components/AnimeList';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAnimeData } from '../../services/useAnimeData';


function App() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const season = getSeason();
    const { loading } = useAnimeData({ query: `${year}/${season}`, limit: 5, type: "season" });

    function getSeason(): string {
        if (month >= 1 && month <= 3) return 'winter';
        else if (month >= 4 && month <= 6) return 'spring';
        else if (month >= 7 && month <= 9) return 'summer';
        else return 'fall';
    }

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <header className="mb-5">
                <Navbar />
            </header>
            <div className="top-space" />
            <main>
                {/* AnimeList para a season atual */}
                <AnimeList
                    query={`${year}/${season}`}
                    limit={2}
                    type="season"
                    isCarroussel
                />

                {/* AnimeList para o ranking */}
                <AnimeList
                    query="one"
                    limit={2}
                    type="list"
                />
            </main>
            <Footer year={year} />
        </div>
    );
}

export default App;
