import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUsers } from '../../api/userData';
import { getCategories } from '../../api/categoryData';
import { createPost, updatePost } from '../../api/postData';
// import { getAllTags } from '../../api/tagData';

const nullPost = {
  userId: 0,
  categoryId: 0,
  title: '',
  content: '',
};
export default function PostForm({ postObj }) {
  const [formData, setFormData] = useState(nullPost);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [tags, setTags] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setFormData(postObj);
  }, [postObj]);

  useEffect(() => {
    getUsers().then(setUsers);
    getCategories().then(setCategories);
    // getAllTags().then(setTags);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      updatePost(formData).then(() => router.push(`/post/${postObj.id}`));
    } else {
      createPost({ ...formData, publicationDate: new Date() }).then(({ id }) => router.push(`/post/${id}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title..."
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="contentText" label="Content" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter post content..."
          style={{ height: '140px' }}
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="userSelect" label="User">
        <Form.Select
          aria-label="User"
          name="userId"
          onChange={handleChange}
          className="mb-3"
          value={formData.userId}
          required
        >
          <option value="">Select a User</option>
          {
            users.map((u) => (
              <option
                key={u.id}
                value={u.id}
              >
                {u.firstName} {u.lastName}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="categorySelect" label="Category">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={formData.categoryId}
          required
        >
          <option value="">Select a Category</option>
          {
            categories.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.label}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <button type="submit">{postObj.id ? 'Update Post' : 'Create Post'}</button>
    </Form>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    categoryId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }),
};

PostForm.defaultProps = {
  postObj: nullPost,
};
