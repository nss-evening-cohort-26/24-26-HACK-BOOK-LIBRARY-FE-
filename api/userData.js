import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const updateUser = (formData) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${formData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const makeUserAdmin = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${userId}/makeadmin`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw new Error('Failed to update admin status');
  }).then((data) => resolve(data))
    .catch(reject);
});
const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }).then((data) => resolve(data))
    .catch((error) => reject(error));
});

export {
  updateUser, getSingleUser, makeUserAdmin, getAllUsers,
};
