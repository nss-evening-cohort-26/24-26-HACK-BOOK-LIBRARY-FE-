import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getBooks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// DELETE BOOK (NOT USERS! ADMINS ONLY)
const deleteBook = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// GET SINGLE BOOK
const getSingleBook = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// ADD A BOOK
const createBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books`, {
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

// UPDATE BOOK
const updateBook = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// ADD A BOOK TO USER BOOKSHELF
const addUserBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/addToShelf`, {
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

// REMOVE A BOOK FROM USER BOOKSHELF BUT NOT FROM LIBRARY
const deleteUserBook = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/{bookId}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getBooks,
  createBook,
  deleteBook,
  getSingleBook,
  updateBook,
  addUserBook,
  deleteUserBook,
};
