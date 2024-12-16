import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotoService } from './js/pixabay-api';
import {
  createMarkup,
  smoothScroll,
  toggleLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form-js');
export const list = document.querySelector('.list-js');
const loader = document.querySelector('.loader');
export const loadMore = document.querySelector('.js-load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;

form.addEventListener('submit', handlerSearch);
loadMore.addEventListener('click', loadMorePhotos);

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

  currentQuery = picture.value.trim();
  currentPage = 1;
  list.innerHTML = '';
  toggleLoadMoreButton(false);
  loader.classList.remove('hidden');

  try {
    const data = await getPhotoService(currentQuery, currentPage, perPage);

    if (data.hits.length === 0) {
      return iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#EF4040',
      });
    }

    createMarkup(data.hits);
    toggleLoadMoreButton(data.totalHits > currentPage * perPage);

    if (currentPage * perPage >= data.totalHits) {
      toggleLoadMoreButton(false);
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: `Error: ${error.message || 'Something went wrong!'}`,
    });
  } finally {
    loader.classList.add('hidden');
  }
}

async function loadMorePhotos() {
  currentPage += 1;
  loader.classList.remove('hidden');
  loadMore.classList.add('hidden');

  try {
    const data = await getPhotoService(currentQuery, currentPage, perPage);
    createMarkup(data.hits);
    toggleLoadMoreButton(data.totalHits > currentPage * perPage);
    smoothScroll();

    if (currentPage * perPage >= data.totalHits) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: `Error: ${error.message || 'Something went wrong!'}`,
    });
  } finally {
    loader.classList.add('hidden');
    if (currentPage * perPage < data.totalHits) {
      loadMore.classList.remove('hidden');
    }
  }
}
