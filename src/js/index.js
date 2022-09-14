import { fetchImages } from './fetchImages';
import { success, info, failure } from './notify';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let input = '';

const show = () => loadBtn.style.display = 'block';
const hide = () => loadBtn.style.display = 'none';

const reset = () => {
    page = 1;
    gallery.innerHTML = '';
    input = form.elements.searchQuery.value.trim();
    hide();
};

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
    if (data.totalHits > data.hits.length) show();
    if (images.length >= data.totalHits) {
        hide();
        info();
    };
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    reset();
    if (input) {
        fetchImages(input, page).then(data => {
            success(data.totalHits);
            generateGallery(data.hits);
            checkIfEnd(data);
        });
    } else {
        failure();
    };
});

loadBtn.addEventListener('click', () => {
    page++;
    fetchImages(input, page).then(data => {
        generateGallery(data.hits);
        checkIfEnd(data);
    });
});