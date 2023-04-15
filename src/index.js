import './js/vars';
import ApiService from './js/api-service';

// myService = new ApiService();
// myService.query = 'Titanic'; // Пошуковий запит
// myService.page = 2; // Номер сторінки

// Для картотеки фільмів

// async function cardsMarkup() {
//   const movieData = await myService.getMoviesData();
//   if (!movieData.movies.length) {
//     console.log('No such movies'); // Тут можна Notify, або якусь модалку
//     return;
//   }
//   console.log(movieData.page);
//   const movieCards = movieData.movies
//     .map(
//       element =>
//         `<div>
//         <img src=${element.poster_url}/>
//         <p>${element.title}</p>
//         <p><span>${element.genres_names.join(', ')}</span> | <span>${
//           element.release_year
//         }</span></p>
//       </div>`
//     )
//     .join('');
//   console.log(movieCards); // Замість console.log можна insertAdjusentHTML
// }

// cardsMarkup();
