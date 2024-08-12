import clientCredentials from '../utils/data/client';

const endpoint = clientCredentials.databaseURL;

const addPostTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postTags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const removePostTag = (postId, tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postTags/${postId}/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export { addPostTag, removePostTag };
