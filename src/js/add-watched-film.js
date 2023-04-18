export function addWatchedFilm(movie) {
  const getMovie = localStorage.getItem('watched');
  const watchedFilms = getMovie ? JSON.parse(getMovie) : [];
    
  !watchedFilms.includes(movie) &&
    localStorage.setItem('watched', JSON.stringify([...watchedFilms, movie]));
}
