import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const deleteComment = (bookId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/book/comments/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

const getBooksComments = (bookId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/book/comments/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const editComment = (commentId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${commentId}`, {
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

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments`, {
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
export {
  deleteComment, getBooksComments, editComment, createComment,
};
