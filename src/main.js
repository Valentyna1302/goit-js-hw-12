import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotoService } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const form = document.querySelector('.form-js');
export const list = document.querySelector('.list-js');
const loader = document.querySelector('.loader');
export const loadMore = document.querySelector('.js-load-more');

form.addEventListener('submit', handlerSearch);

async function handlerSearch(event) {
  event.preventDefault();

  const { picture } = event.currentTarget.elements;

  if (picture.value.trim() === '') {
    return iziToast.error({
      position: 'topRight',
      message: 'Fill out the form',
      backgroundColor: '#EF4040',
    });
  }
  list.innerHTML = '';
  loader.classList.remove('hidden');

  getPhotoService(picture.value.trim())
    .then(data => {
      if (data.hits.length === 0) {
        return iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#EF4040',
        });
      }
      createMarkup(data.hits);
      form.reset();
    })
    .catch(error =>
      iziToast.error({ position: 'topRight', message: error.message })
    )
    .finally(() => loader.classList.add('hidden'));
}
