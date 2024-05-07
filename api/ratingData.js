import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAverageRating = (bookId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ratings/book/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve((data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const postRating = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ratings/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const checkIfUserRatingExists = (bookId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ratings/book/${bookId}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateRating = (userId, bookId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ratings/book/${bookId}/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAverageRating, postRating, checkIfUserRatingExists, updateRating,
};
