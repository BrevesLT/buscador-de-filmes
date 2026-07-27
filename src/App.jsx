import {useState} from 'react';
import './App.css';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState({ min: 1900, max: new Date().getFullYear() });
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [rating, setRating] = useState(0);

  const genres = {
    28: 'Ação',
    12: 'Aventura',
    16: 'Animação',
    35: 'Comédia',
    80: 'Crime',
    99: 'Documentário',
    18: 'Drama',
    10751: 'Família',
    14: 'Fantasia',
    36: 'História',
    27: 'Terror',
    10402: 'Música',
    9648: 'Mistério',
    10749: 'Romance',
    878: 'Ficção científica',
    10770: 'Cinema TV',
    53: 'Thriller',
    10752: 'Guerra',
    37: 'Faroeste'
  };
  

  async function fetchMovies() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${searchTerm}&language=pt-BR`);
      const data = await response.json();
      setMovies(data.results || []);
      setLoading(false);
      setSearched(true);
    } catch (err) {
      setError('Erro ao buscar filmes.');
      setLoading(false);
    }
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesGenres = selectedGenres.length === 0 || selectedGenres.every((genre) => movie.genre_ids.includes(genre));
    const matchesYear = !movie.release_date || (parseInt(movie.release_date.slice(0, 4)) >= yearRange.min && parseInt(movie.release_date.slice(0, 4)) <= yearRange.max);
    const matchesRating = !rating || movie.vote_average >= rating;
    return matchesGenres && matchesYear && matchesRating;
  });

  filteredMovies.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'release_date') {
      return new Date(b.release_date) - new Date(a.release_date);
    } else if (sortBy === 'vote_average') {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Buscador de Filmes</h1>
        <div className="searchbar-container">
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchMovies();
              }
            }}
            
          />
          <button onClick={() => {
            fetchMovies();
          }}>
            Buscar
          </button>
        </div>
      </header>
      

      <div className="main-content">
        <aside className="filters-sidebar">
          <h2>Gênero</h2>
          <div className="genres-checkboxes">
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 28]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 28));
                }
              }} />
              Ação
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 35]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 35));
                }
              }} />
              Comédia
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 18]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 18));
                }
              }} />
              Drama
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 35]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 35));
                }
              }} />
              Romance
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 27]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 27));
                }
              }} />
              Terror
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 10769]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 10769));
                }
              }} />
              Ficção científica
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 14]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 14));
                }
              }} />
              Fantasia
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 28]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 28));
                }
              }} />
              Aventura
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 16]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 16));
                }
              }} />
              Animação
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 80]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 80));
                }
              }} />
              Crime
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 99]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 99));
                }
              }} />
              Documentário
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 10751]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 10751));
                }
              }} />
              Família
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 10769]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 10769));
                }
              }} />
              História
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 10770]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 10770));
                }
              }} />
              Música
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 53]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 53));
                }
              }} />
              Mistério
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 878]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 878));
                }
              }} />
              Cinema TV
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 80]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 80));
                }
              }} />
              Thriller
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 10752]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 10752));
                }
              }} />
              Guerra
            </label>
            <label>
              <input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedGenres([...selectedGenres, 37]);
                } else {
                  setSelectedGenres(selectedGenres.filter((g) => g !== 37));
                }
              }} />
              Faroeste
            </label>
          </div>
          <div className="year-slider">
            <h2>Ano</h2>
            
            <div className="range-container">
              <input
                type="range"
                min="1980"
                max="2026"
                value={yearRange.min}
                onChange={(e) => {
                  const value = Math.min(Number(e.target.value), yearRange.max - 1);
                  setYearRange({ ...yearRange, min: value });
                }}
                className="thumb thumb-left"
              />
              <input
                type="range"
                min="1980"
                max="2026"
                value={yearRange.max}
                onChange={(e) => {
                  const value = Math.max(Number(e.target.value), yearRange.min + 1);
                  setYearRange({ ...yearRange, max: value });
                }}
                className="thumb thumb-right"
              />
            </div>

            <div className="slider-years-labels">
              <span>{yearRange.min}</span>
              <span>{yearRange.max}</span>
            </div>
          </div>
          <div className="star-rating">
            <h2>Classificação:</h2>
            <div className="stars">
              <label> <input type="radio" name="rating" value="1" checked={rating === 1} onChange={() => setRating(1) && fetchMovies()} />⭐+</label>
              <label> <input type="radio" name="rating" value="2" checked={rating === 2} onChange={() => setRating(2) && fetchMovies()} />⭐⭐+</label>
              <label> <input type="radio" name="rating" value="3" checked={rating === 3} onChange={() => setRating(3) && fetchMovies()} />⭐⭐⭐+</label>
              <label> <input type="radio" name="rating" value="4" checked={rating === 4} onChange={() => setRating(4) && fetchMovies()} />⭐⭐⭐⭐+</label>
              <label> <input type="radio" name="rating" value="5" checked={rating === 5} onChange={() => setRating(5) && fetchMovies()} />⭐⭐⭐⭐⭐+</label>
            </div>
          </div>
          <div className="sort-by">
            <h2>Ordenar por:</h2>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="title">Título</option>
              <option value="release_date">Data de Lançamento</option>
              <option value="vote_average">Avaliação</option>
            </select>
          </div>
        </aside>

        <div className="movies-container">
          {searched && !loading && filteredMovies.length === 0 && (
            <p>Nenhum filme encontrado.</p>
          )}
          {loading && <p>Carregando...</p>}
          {error && <p>{error}</p>}

          {filteredMovies.length > 0 && !loading ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                      <img
                        src="./src/assets/noposter.png"
                        alt="Sem poster disponível"
                      />
                  )}
        
                </div>
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date ? movie.release_date.slice(0, 4) : 'Data não disponível'}</p>
                  <div className="movie-footer">
                    <span className="movie-genre">{movie.genre_ids?.map((id) => genres[id]).join(', ') || 'Gênero não disponível'}</span>
                    <span className="movie-rating"> ⭐{movie.vote_average.toFixed(1)}</span>
                  </div>
                  

                </div>
    
              </div>
            ))
          ) : (
            null
          )}
        </div>
      </div>
    </div>

    
      
  );
}

export default App;