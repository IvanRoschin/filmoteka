import { refs } from './refs';
import makingMarkup from './api/render-card-markup';
import {
  insertFilmsMarkupToLibrary,
} from './api/insertingIntoDifferentContainers';

//ДОДАТИ ДО КЛЮЧА "WATCHED" В LOCAL STORAGE
export function addWatchedLocalStorage(obj) {
  let arrayFilmsWatched = [];
  const w = localStorage.getItem('watched');
  if (w) {
    arrayFilmsWatched = JSON.parse(w);
  }
  // Перевірка на наявність об'єкта в масиві фільмів "WATCHED"
  const isAddedFilm = arrayFilmsWatched.find(arr => arr.id === obj.id);
  if(isAddedFilm) {
    return;
  }
  arrayFilmsWatched.push(obj);
  localStorage.setItem('watched', JSON.stringify(arrayFilmsWatched));
  return arrayFilmsWatched;
}

//ДОДАТИ ДО КЛЮЧА "QUEUE" В LOCAL STORAGE
export function addQueueLocalStorage(obj) {
  let arrayFilmsQueue = [];
  const q = localStorage.getItem('queue');
  if (q) {
    arrayFilmsQueue = JSON.parse(q);
  }
  // Перевірка на наявність об'єкта в масиві фільмів "QUEUE"
  const isAddedFilm = arrayFilmsQueue.find(arr => arr.id === obj.id);
  if(isAddedFilm) {
    return;
  }
  arrayFilmsQueue.push(obj);
  localStorage.setItem('queue', JSON.stringify(arrayFilmsQueue));
  return arrayFilmsQueue;
}

export function getWatchedFilms() {
  clearLibrary();
  try {
    const saveFilms = localStorage.getItem('watched');
    //Якщо в localStorage немає ключа watched - показуємо заглушку
    if (saveFilms === null) {
      addScreenSaver();
      return;
    }

    const parsedFilms = JSON.parse(saveFilms);
    if (parsedFilms.length === 0) {
      addScreenSaver();
      return;
    }

    const renderWatched = makingMarkup(parsedFilms);
    insertFilmsMarkupToLibrary(renderWatched);
  } catch (error) {
    console.log(error);
  }
}

export function getQueueFilms() {
  clearLibrary();
  try {
    const saveFilms = localStorage.getItem('queue');
    //Якщо в localStorage немає ключа queue - показуємо заглушку
    if (saveFilms === null) {
      addScreenSaver();
      return;
    }

    const parsedFilms = JSON.parse(saveFilms);
    // Перевірка на порожній масив в localStorage
    if (parsedFilms.length === 0) {
      addScreenSaver();
      return;
    }

    const renderQueue = makingMarkup(parsedFilms);
    insertFilmsMarkupToLibrary(renderQueue);
  } catch (error) {
    console.log(error);
  }
}

// Функція для видалення фільмів з масиву WATCHED
export function deleteWatched(element) {
  const arrayFromLocStorage = JSON.parse(localStorage.getItem('watched'));
  const index = arrayFromLocStorage.findIndex(arr => arr.id === element.id);
  arrayFromLocStorage.splice(index, 1);

  localStorage.setItem('watched', JSON.stringify(arrayFromLocStorage));
  getWatchedFilms();
}

// Функція для видалення фільмів з масиву QUEUE
export function deleteQueue(element) {
  const arrayFromLocStorage = JSON.parse(localStorage.getItem('queue'));
  const index = arrayFromLocStorage.findIndex(arr => arr.id === element.id);
  arrayFromLocStorage.splice(index, 1);

  localStorage.setItem('queue', JSON.stringify(arrayFromLocStorage));
  getQueueFilms();
}

//   Фунуція для очищення попередніх результатів рендеру
function clearLibrary() {
  refs.libraryCardsContainer.innerHTML = '';
}

// Функція для відмальовки "заглушки" (якщо localStorage порожній)
function addScreenSaver() {
  refs.libraryCardsContainer.innerHTML = `<strong 
    style="
    font-size: 18px;
    color: var(--secondary-text-cl);">
    Sorry, no information has been added
    </strong>`;
}
