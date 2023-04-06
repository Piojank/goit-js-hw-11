import './sass/main.scss';
import Notiflix from "notiflix";
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from './js/fetchImages.js';

const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);
const input = qs('.search-form__input');
const btnSearch = qs('button');
const gallery = qs('.gallery');
const btnLoadMore = qs('.load-more');

let pageNumber = 1;
let totalHits = 0;
let leftHits = 0;

const searchImages = () => {
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

        renderPhotos(photos);
            pageNumber += 1;
            leftHits = totalHits - pageNumber * 40;
        })

        .catch(err => {
            console.log(err);
        });
};

const renderPhotos = (photos) => {
    totalHits = photos.totalHits;
    
    if (pageNumber <= 1) {
        leftHits = totalHits;
        if (totalHits <= 0) {
            Notiflix.Notify.failure("Sorry, there are no photos matching your search query. Please try again.");
            btnLoadMore.classList.toggle('is-hidden');
        } else {
            Notiflix.Notify.success(`Found ${photos.totalHits} photos`);
        }
    }

    const markup = photos.hits.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="photo-card">
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
    </div>`).join("");

    gallery.innerHTML = markup;

    if (pageNumber > 1) {
        const { height: cardHeight } = document
        .querySelector('.gallery .photo-card')
        .getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
        });
    }

    let lightbox = new SimpleLightbox(".gallery a", {
        captionPosition: "outside",
        captionsData: "alt",
        captionDelay: "250",
    });
};

const getPhotos = e => {
    e.preventDefault();
    pageNumber = 1;
    gallery.innerHTML = '';
    searchImages();
};

const loadMore = e => {
    e.preventDefault();
    searchImages();
};

btnSearch.addEventListener('click', getPhotos);
btnLoadMore.addEventListener('click', loadMore);
