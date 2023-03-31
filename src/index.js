import Notiflix from "notiflix";
import debounce from "lodash.debounce";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const qs = (s) => document.querySelector(s);
const gallery = qs('.gallery');

// const renderGalleryPhotoBySearchTag = (photos) => {

//     const markup = photos
//         .map(
//             (photo) => ``
//         )
//         .join("");
//     gallery.innerHTML = markup;
// };