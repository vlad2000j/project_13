import './js/vars';
import ApiService from './js/api-service';

myService = new ApiService();
myService.query = 'Dos';

async function cardsMarkup() {
  const movieData = await myService.getMoviesData();
  console.log(movieData.page);
  const movieCards = movieData.movies
    .map(
      element =>
        `<div>
        <img src=${element.poster_url}/>
        <p>${element.title}
        <p><span>${element.genres_names.join(', ')}</span> | <span>${
          element.release_year
        }</span></p>
      </div>`
    )
    .join('');
  console.log(movieCards); // Замість console.log можна insertAdjusentHTML
}

cardsMarkup();
