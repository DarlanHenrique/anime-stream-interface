import 'bootstrap/dist/css/bootstrap.min.css';

import '../../css/App.css'
import PRODUCTIONS from '../../database/Audiovisual_productions.json'
import Category from './Category';
import Production from './Production'
import NewProduction from './NewProduction'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimeList from './MyAnimeListComponent'


const allGenres: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .flatMap((production) => production.genre.map((genre) => genre.trim()))
  )
);

const allTypes: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .map((production) => production.type.trim())
  )
);

const streamServices: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .map((production) => production.streamService.trim())
  )
);

function App() {
  return (
    <div>
      <header className='mb-5'>
        <Navbar types={allTypes} genres={allGenres} streamServices={streamServices} />
      </header><div className="top-space"></div><main>

        {/* PARA AGRUPAR POR NOVAS PRODUÇÕES */}
        <Category key="new-productions" name="Novas Produções">
          {PRODUCTIONS.audiovisual_productions
            .filter((production) => production.isNew)
            .map((production) => (
              <NewProduction
                key={production.name}
                name={production.name}
                type={production.type}
                genre={production.genre}
                length={production.length}
                description={production.description}
                image={production.image}
                isNew={production.isNew}
                classification={production.indicativeClassification}
                streamService={production.streamService} />
            ))}
        </Category>
        {/* PARA AGRUPAR POR GENEROS */}
        {/* {allGenres.map((genre) => (
          <Category key={genre} type='category' name={genre}>
            {PRODUCTIONS.audiovisual_productions.filter((production) => production.genre.map((g) => g.trim()).includes(genre)).map((production) => (
              <Production
                key={production.name}
                name={production.name}
                year={production.year}
                type={production.type}
                genre={production.genre}
                length={production.length}
                description={production.description}
                image={production.image}
                isNew={production.isNew}
                classification={production.indicativeClassification}
                streamService={production.streamService} />
            ))}
          </Category>
        ))} */}
        {/* PARA AGRUPAR POR TIPOS */}
        {/* {allTypes.map((type) => (
          <Category key={type} name={type}>
            {PRODUCTIONS.audiovisual_productions.filter((production) => production.type.trim() == type)
              .map((production) => (
                <Production
                  key={production.name}
                  name={production.name}
                  year={production.year}
                  type={production.type}
                  genre={production.genre}
                  length={production.length}
                  description={production.description}
                  image={production.image}
                  isNew={production.isNew}
                  classification={production.indicativeClassification}
                  streamService={production.streamService} />
              ))}
          </Category>
        ))} */}
        <AnimeList></AnimeList>
      </main>
      <Footer />
    </div>
  )
}

export default App
