import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let input = '';

const generateCard = (card) => {
    return `
        <div class="photo-card">
            <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b> ${card.likes}
                </p>
                <p class="info-item">
                    <b>Views</b> ${card.views}
                </p>
                <p class="info-item">
                    <b>Comments</b> ${card.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b> ${card.downloads}
                </p>
            </div>
        </div>
    `;
};

const generateGallery = (array) => {
    array.forEach((card) => gallery.innerHTML += generateCard(card));
};

const checkIfEnd = (data) => {
    const images = [...document.querySelectorAll('.photo-card')];
    if (data.totalHits > data.hits.length) loadBtn.style.display = 'block';
    if (images.length >= data.totalHits) {
        loadBtn.classList.toggle('hide');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    };
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    page = 1;
    gallery.innerHTML = '';
    input = form.elements.searchQuery.value.trim();
    loadBtn.style.display = 'none';

    if (input) {
        fetchImages(input, page).then(data => {
            generateGallery(data.hits);
            checkIfEnd(data);
        });
    } else {
        Notiflix.Notify.failure("Input can't be empty");
    };
});

loadBtn.addEventListener('click', () => {
    page++;
    fetchImages(input, page).then(data => {
        generateGallery(data.hits);
        checkIfEnd(data);
    });
});