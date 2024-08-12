import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUsers } from '../../api/userData';
import { getCategories } from '../../api/categoryData';
import { createPost, updatePost } from '../../api/postData';
import { createTag, getAllTags } from '../../api/tagData';
import { addPostTag, removePostTag } from '../../api/postTagData';

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
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // const [newTags, setNewTags] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (postObj.id) {
      setFormData({
        id: postObj.id,
        userId: postObj.userId,
        categoryId: postObj.categoryId,
        title: postObj.title,
        content: postObj.content,
        publicationDate: postObj.publicationDate,
      });
      setSelectedTags(postObj.tags.map((tag) => ({ value: tag.id, label: tag.label })));
    }
  }, [postObj]);

  useEffect(() => {
    getUsers().then(setUsers);
    getCategories().then(setCategories);
    getAllTags().then(setTags);
  }, []);

  const handleTagChange = (selections) => {
    setSelectedTags(selections);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const managePostTags = async (postId) => {
    selectedTags.forEach((tag) => {
      if (typeof tag.value === 'string') {
        createTag({ label: tag.label }).then(({ id }) => addPostTag({ postId, tagId: id }));
      } else if (postObj?.tags?.some((postTag) => postTag.id === tag.value)) {
        console.warn(`Existing ${tag.value}`);
      } else {
        addPostTag({ postId, tagId: tag.value });
      }
    });
    postObj?.tags?.forEach((tag) => {
      if (!selectedTags.some((sTag) => sTag.value === tag.id)) {
        removePostTag(postId, tag.id);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      managePostTags(postObj.id);
      updatePost(formData).then(() => router.push(`/post/${postObj.id}`));
    } else {
      createPost({ ...formData, publicationDate: new Date() }).then(({ id }) => {
        managePostTags(id).then(() => router.push(`/post/${id}`));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} id={234}>
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

      <CreatableSelect
        instanceId="tagSelect"
        aria-label="Tags"
        name="tags"
        className="mb-3"
        value={selectedTags}
        isMulti
        onChange={handleTagChange}
        options={tags.map((tag) => ({ value: tag.id, label: tag.label }))}
      />

      <button className="btn btn-outline btn-primary" type="submit">{postObj.id ? 'Update Post' : 'Create Post'}</button>
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
    publicationDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }),
};

PostForm.defaultProps = {
  postObj: nullPost,
};
