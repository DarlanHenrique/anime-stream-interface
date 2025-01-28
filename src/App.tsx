import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Navbar from "./components/Navbar";
import Home from "./site/index/Home";
import AnimeDetailsPage from "./site/anime/AnimeDetailsPage";
import EpisodeWatchingPage from "./site/anime/EpisodeWatchingPage";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";

function App() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const resetToInitialState = () => {
    setIsSearchActive(false);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setIsSearchActive(true);
    setSearchQuery(query);
  };

  return (
    <Router basename="/anime-stream-interface">
      <header className="mb-5">
        <Navbar onHomeClick={resetToInitialState} onSearch={handleSearch} />
      </header>
      <div className="top-space" />
      <main>
        {!isSearchActive ? (
          <Routes>
            <>
              <Route path="/" element={<Home />} key="home" />
              <Route path="/anime/:id/:name" element={<AnimeDetailsPage />} key="anime-details" />
              <Route path="/anime/:id/:name/:index" element={<EpisodeWatchingPage />} key="anime-watch" />
            </>
          </Routes>
        ) : (
          <SearchResults searchQuery={searchQuery} onReset={resetToInitialState} />
        )}
      </main>
      <Footer year={year} />
    </Router>
  );
}

export default App;
