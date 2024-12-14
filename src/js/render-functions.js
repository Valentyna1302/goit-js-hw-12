import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { list, loadMore } from '../main';

const modal = new SimpleLightbox('.gallery-list a');

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
      }) => `<li class="list-item">
  <a href="${largeImageURL}" alt="${tags}">
    <img src="${webformatURL}" alt="${tags}" class="img-item">
  </a>
  <div class="list-container">
    <p class="item"><span class="item-text">Likes:</span> <span>${likes}</span></p>
    <p class="item"><span class="item-text">Views:</span> <span>${views}</span></p>
    <p class="item"><span class="item-text">Comments:</span> <span>${comments}</span></p>
    <p class="item"><span class="item-text">Downloads:</span> <span>${downloads}</span></p>
  </div>
</li>`
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
  modal.refresh();
}

export function smoothScroll() {
  const { height: cardHeight } = list.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function toggleLoadMoreButton(shouldShow) {
  loadMore.classList.toggle('hidden', !shouldShow);
}
