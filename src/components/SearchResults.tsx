import AnimeList from "./AnimeList";

interface SearchResultsProps {
  searchQuery: string;
  onReset: () => void;
}

function SearchResults({ searchQuery, onReset }: SearchResultsProps) {
  return (
    <>
      <div className="anime-list-title mt-1">
        <h2>Results for "{searchQuery}"</h2>
        <p>Here are the best results for your search</p>
      </div>
      <AnimeList query={searchQuery} limit={15} type="list" carruselId={`search${searchQuery}`} />
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-secondary" onClick={onReset}>
          Back to page
        </button>
      </div>
    </>
  );
}

export default SearchResults;
