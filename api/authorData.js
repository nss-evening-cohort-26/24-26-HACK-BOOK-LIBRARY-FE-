import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAuthors = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors`, {
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

const getAuthorsAndBooks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteAuthor = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleAuthor = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleAuthorAndBooks = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${id}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createAuthor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors`, {
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

const updateAuthor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${payload.id}`, {
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

const deleteSingleAuthorAndBooks = (authorObj) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${authorObj.id}/books`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAuthors,
  deleteAuthor,
  getSingleAuthor,
  createAuthor,
  getAuthorsAndBooks,
  getSingleAuthorAndBooks,
  updateAuthor,
  deleteSingleAuthorAndBooks,
};
