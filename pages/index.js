import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PostCard from '../components/PostCard';
import { getPosts, getPostsByCategory, getPostsByUsers } from '../api/postData';
import { getCategories } from '../api/categoryData';
import { getUsers } from '../api/userData';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categoriePosts, setCategoriePosts] = useState([]);
  const [authorPosts, setAuthorPosts] = useState([]);

  const getAllPost = () => {
    getPosts().then(setPosts);
  };

  const getAllCategoriePost = () => {
    getCategories().then(setCategoriePosts);
  };

  const handleCategoryClick = (id) => {
    getPostsByCategory(id).then(setPosts);
  };

  const getAllUsers = () => {
    getUsers().then(setAuthorPosts);
  };
  const handleAuthorClick = (id) => {
    getPostsByUsers(id).then(setPosts);
  };

  useEffect(() => {
    getAllPost();
    getAllCategoriePost();
    getAllUsers();
  }, []);

  return (
    <div>
      <DropdownButton
        align="end"
        id="dropdown-item-button"
        title="Search by Category"
        className="drop-down-filter"
      >
        {categoriePosts.map((category) => (
          <div key={category.id}>
            <Dropdown.Item as="button" onClick={() => handleCategoryClick(category.id)}>{category.label}</Dropdown.Item>
          </div>
        ))}
      </DropdownButton>
      <DropdownButton
        align="end"
        id="dropdown-item-button"
        title="Search by Author"
        className="drop-down-filter"
      >
        {authorPosts.map((author) => (
          <div key={author.id}>
            <Dropdown.Item as="button" onClick={() => handleAuthorClick(author.id)}>{author.firstName} {author.lastName}</Dropdown.Item>
          </div>
        ))}
      </DropdownButton>
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} />
      ))}
    </div>
  );
}

export default Home;
