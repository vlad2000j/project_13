import MoviesMarkup from './movies-markup';
const form = document.querySelector('#search-form');

const cardMarkup = new MoviesMarkup();

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  cardMarkup.page = 2;
  cardMarkup.searchQuery = form.searchQuery.value;
  cardMarkup.clearMarkup();
  cardMarkup.searchedMoviesMarkup(cardMarkup.searchQuery);
}
