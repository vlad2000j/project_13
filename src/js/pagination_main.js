import Pagination from 'tui-pagination';
import axios from 'axios';

const container = document.getElementById('tui-pagination-container');
const options = { // below default value of options
     totalItems: 1000,
     itemsPerPage: 20,
     visiblePages: 7,
     page: 1,
     centerAlign: true,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
    template: {
         
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
    },
    async function (pageNum, pagination) {
    const response = await getMoviesByPage(pageNum);
    // update your UI with the new data
    // ...
  }
};
     

const pagination = new Pagination(container, options);

async function getMoviesByPage(pageNum) {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${pageNum}`
  );
  return response.data;
}
