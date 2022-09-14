import Notiflix from 'notiflix';

const axios = require('axios');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '7130529-cd9ea3f018b85a189f3c85b8b';

export async function fetchImages(input, page) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: input,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 40
            }
        });
        const data = response.data;
        if (data.totalHits === 0) throw new Error();
        return data;
    } catch {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    };
};