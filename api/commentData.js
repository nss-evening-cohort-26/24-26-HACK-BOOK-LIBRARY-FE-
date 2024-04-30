import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const deleteComment = (bookId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${bookId}`, {
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
export { deleteComment, getBooksComments };
