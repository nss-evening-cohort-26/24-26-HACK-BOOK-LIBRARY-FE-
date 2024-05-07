import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const searchBooks = (input) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/search/books?query=${input}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const searchAuthors = (input) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/search/authors?query=${input}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export { searchBooks, searchAuthors };
