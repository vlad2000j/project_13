import QueueService from './queue-service';
import {
  insertMarkup, markup, clearMarkup
} from './movies';
import { fetchById } from './movies-api-service';

const active = 'header-button-active';
const buttons = {
  libraryButton: document.querySelector('[data-action="library"]'),
  watchedButton: document.querySelector('[data-action="watched"]'),
  queueButton: document.querySelector('[data-action="queue"]'),
}

buttons.libraryButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.target.classList.add(active);
  //показати кнопки Queue і Watched
  buttons.queueButton.style.visibility = 'visible';
  buttons.watchedButton.style.visibility = 'visible';
})

//Повертає масив фільмів, що знаходяться в черзі
buttons.queueButton.addEventListener('click', async (event) => {
  event.preventDefault();
  toggleActiveButton(event);
  buttons.watchedButton.classList.remove(active);
  clearMarkup();
  const moviesInQueue = Array.from(new QueueService().getAllQueue());
  
  let moviesData = await getMoviesById(moviesInQueue);

  const mappedMovies = markup(moviesData);
  insertMarkup(mappedMovies);
});

const getMoviesById = async (movieIds) => {
  let moviesData = [];
  for await (const movieId of movieIds) {
    const movieData = await fetchById(movieId);
    moviesData.push(movieData);
  };

  return moviesData;
};

//Повертає масив фільмів, що знаходяться в списку переглянутих
buttons.watchedButton.addEventListener('click', async (event) => {
  event.preventDefault();
  toggleActiveButton(event);
  buttons.queueButton.classList.remove(active);
  clearMarkup();
  const getWatched = localStorage.getItem('WatchedFilms');
  const watchedMovies = getWatched ? JSON.parse(getWatched) : [];
  let moviesData = await getMoviesById(watchedMovies);

  const mappedMovies = markup(moviesData);
  return insertMarkup(mappedMovies);
});
 
//Підсвічує кнопку, на яку натиснув користувач
toggleActiveButton = (event) => {
  if (event.target.classList.contains(active))
  event.target.classList.remove(active);
  else
  event.target.classList.add(active);
};