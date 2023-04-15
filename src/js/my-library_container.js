async function cardsMarkUp() {
  const movieData = JSON.parse(localStorage.getItem('movieData'));

  if (!movieData.movies.length) {
    console.log('No such movies');
    return;
  }
    console.log(movieData.page);
    const movieCards = movieData.movies.map(element => <div> <img src=${element.poster_url} /> <p>${element.title}</p> <p><span>${element.genres_names.join(', ')}</span> | <span>${element.release_year}</span></p> </div>).join('');
    console.log(movieCards);
}

const movieData = {
    movies: [],
    page: 1,
};

localStorage.setItem('movieData', JSON.stringify(movieData));

cardsMarkUp();
