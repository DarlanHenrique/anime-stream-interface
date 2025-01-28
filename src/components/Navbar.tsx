import { useState, useEffect } from 'react';
import "../css/Navbar.css";
import logo from '../assets/logo/Net_Prime_Plus_Max_Flix.png';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onHomeClick: () => void;
  onSearch: (query: string) => void;
}

export default function Navbar({ onHomeClick, onSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 96);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
      setSearchQuery('');
      setShowSearchModal(false);
    }
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top mt-2 ${isScrolled ? 'navbar-light bg-light' : ''
          }`}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img className="logo" src={logo} alt="Net Prime Plus Max Flix" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`btn me-2 ${isScrolled ? 'btn-outline-dark' : 'btn-outline-light'
                    }`}
                  onClick={onHomeClick}
                >
                  Home
                </Link>
              </li>
            </ul>
            <button
              className={`btn ${isScrolled ? 'btn-outline-dark' : 'btn-outline-light'
                }`}
              type="button"
              onClick={() => setShowSearchModal(true)}
            >
              🔎 Search
            </button>
          </div>
        </div>
      </nav>

      {showSearchModal && (
        <div className="search-modal">
          <div className="search-modal-overlay" onClick={() => setShowSearchModal(false)}></div>
          <div className="search-modal-content">
            <input
              className="search-input"
              type="text"
              placeholder="Search your favoirite anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              autoFocus
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍
            </button>
          </div>
        </div>
      )}
    </>
  );
}
