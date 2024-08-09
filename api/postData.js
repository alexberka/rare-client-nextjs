import clientCredentials from '../utils/data/client';

const endpoint = clientCredentials.databaseURL;

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts`, {
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

const updatePost = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export { createPost, updatePost, deletePost };
