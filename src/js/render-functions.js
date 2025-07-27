// render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreWrapper = document.querySelector('.load-more-wrapper');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(createCardMarkup).join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function createCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        ${createInfoItem('Likes', likes)}
        ${createInfoItem('Views', views)}
        ${createInfoItem('Comments', comments)}
        ${createInfoItem('Downloads', downloads)}
      </div>
    </li>
  `;
}

function createInfoItem(label, value) {
  return `
    <div class="info-item">
      <p class="label">${label}</p>
      <p class="value">${value}</p>
    </div>
  `;
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreWrapper.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreWrapper.classList.add('hidden');
}
