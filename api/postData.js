import clientCredentials from '../utils/data/client';

const endpoint = clientCredentials.databaseURL;

//GET ALL POST x
export const getPosts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

//GET POST BY ID x
export const getSinglePost = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

//GET POST BY CATEGORY ID x
export const getPostsByCategory = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

//GET POST BY TAGS ID
export const getPostsByTags = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/tags/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
//GET POST BY USER ID
export const getPostsByUsers = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createPost = (payload) =>
  new Promise((resolve, reject) => {
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

const updatePost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${payload.id}`, {
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

const deletePost = (id) =>
  new Promise((resolve, reject) => {
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
