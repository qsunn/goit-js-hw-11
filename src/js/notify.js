import Notiflix from "notiflix";

export const success = (totalHits) => Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
export const info = () => Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
export const failure = () => Notiflix.Notify.failure("Input can't be empty");