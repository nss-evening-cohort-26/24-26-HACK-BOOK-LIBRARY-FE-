import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGenres = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/genres`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/genres/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getGenres, getSingleGenre };
