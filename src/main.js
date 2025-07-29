import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  enableLoadMoreButton,
  disableLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', handleSearchSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearchSubmit(event) {
  event.preventDefault();

  const input = form.elements['search-text'];
  const query = input.value.trim();

  if (!query) {
    showWarning('Please enter a search query!');
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data.hits.length) {
      showWarning('No images found. Try another query.');
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    const hasMore = totalHits > currentPage * 15;
    hasMore ? showLoadMoreButton() : hideLoadMoreButton();
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  showLoader();
  disableLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    scrollToNewContent();

    const hasMore = currentPage * 15 < totalHits;
    if (!hasMore) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
    enableLoadMoreButton();
  }
}

function scrollToNewContent() {
  const firstCard = document.querySelector('.gallery-item');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

function showWarning(message) {
  iziToast.warning({
    message,
    position: 'topRight',
  });
}

function handleError(error) {
  hideLoader();
  iziToast.error({
    message: `Error: ${error.message}`,
    position: 'topRight',
  });
}
