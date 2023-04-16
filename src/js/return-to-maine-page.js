import { ApiService } from './api-servis';
import { createMoviesMarkup } from './movies';

export {
   logotype,
   returnToMainePage,
}


const apiService = new ApiService()

const logotype = document.querySelector('.logo');

logotype.addEventListener('click', returnToMainePage);

function returnToMainePage(e) {
    e.preventDefault();
    apiService.resetPage();
    createMoviesMarkup(page)
}

// По кліку на логотип йде новий запит до першоі сторінки популярних фільмів