import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { list, loadMore } from '../main';

const modal = new SimpleLightbox('.list-item a');

export function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="list-item" >
  <a href="${largeImageURL}" alt="${tags}" />
    <img src="${webformatURL}" alt="${tags}" class="img-item">
  <div class="list-container">
  <p class="item"><span class="item-text">Likes</span> <span>${likes}</span></p>
  <p class="item"><span class="item-text">Wiews</span> <span>${views}</span></p>
  <p class="item"><span class="item-text">Comments</span> <span>${comments}</span></p>
  <p class="item"><span class="item-text">Downlods</span> <span>${downloads}</span></p>
  </div></a>
</li>`
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
  loadMore.classList.replace('load-more-hidden', 'load-more');
  modal.refresh();
}
