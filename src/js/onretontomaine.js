import { returnToMainePage } from './return-to-maine-page';

export { homebut };

const homebut = document.querySelector('.home');

homebut.addEventListener('click', returnToMainePage);



// треба виконати умову :  Після натискання на  кнопку HOME  відображається головна сторінка
//  Рішення : По кліку на  кнопку HOME  йде новий запит до першоі сторінки популярних фільмів
