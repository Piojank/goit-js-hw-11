import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
import { debounce } from 'lodash';
import { fetchImages } from './fetchImages';
import _default from '../node_modules/simplelightbox/dist/simple-lightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const qs = selector => document.querySelector(selector);
const input = qs('.search-form__input');
const btnSearch = qs('button');
const gallery = qs('.gallery');
const btnLoadMore = qs('.load-more');

let pageNumber = 1;
let totalHits = 0;
let leftHits;

const searchImagesValue = () => {
  fetchImages(input.value, pageNumber)
    .then(photos => {
      if (pageNumber < 1) {
        gallery.innerHTML = '';
      } else if (pageNumber >= 1) {
        btnLoadMore.classList.remove('is-hidden');

        if (leftHits < 0) {
          btnLoadMore.classList.add('is-hidden');
          Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
        }
      }
      renderImages(photos);
      pageNumber += 1;
      leftHits = totalHits - pageNumber * 40;
    })
    .catch(err => {
      console.log(err);
    });
};

function renderImages(photos) {
  totalHits = photos.totalHits;

  if (pageNumber <= 1) {
    leftHits = totalHits;
    if (totalHits <= 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`,
      );
      btnLoadMore.classList.toggle('is-hidden');
    } else {
      Notiflix.Notify.success(`Found ${photos.totalHits} images`);
    }
  }

  photos.hits.forEach(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      gallery.innerHTML += `<div class="photo-card">
        <a class="photo-card__item" href="${largeImageURL}">
          <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b class="info-item__description">Likes
            <span class="info-item__count">${likes}</span>
            </b>
          </p>
          <p class="info-item">
            <b class="info-item__description">Views
            <span class="info-item__count">${views}</span>
            </b>
          </p>
          <p class="info-item">
            <b class="info-item__description">Comments
            <span class="info-item__count">${comments}</span>
            </b>
          </p>
          <p class="info-item">
            <b class="info-item__description">Downloads
            <span class="info-item__count">${downloads}</span>
            </b>
          </p>
        </div>
      </div>`;
    },
  );

  if (pageNumber > 1) {
    const { height: cardHeight } = document
      .querySelector('.gallery .photo-card')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  let lightbox = new SimpleLightbox('.gallery a', {
    captionPosition: 'outside',
    captionsData: 'alt',
    captionDelay: '250',
  });
}

const newSearch = e => {
  e.preventDefault();
  pageNumber = 1;
  gallery.innerHTML = '';
  searchImagesValue();
};

const loadMore = e => {
  e.preventDefault();
  searchImagesValue();
};

btnSearch.addEventListener('click', newSearch);
btnLoadMore.addEventListener('click', loadMore);