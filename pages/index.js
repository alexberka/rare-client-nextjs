import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { getPosts, getPostsByCategory, getPostsByUsers } from '../api/postData';
import { getCategories } from '../api/categoryData';
import { getUsers } from '../api/userData';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [authorPosts, setAuthorPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');

  const getAllPost = () => {
    getPosts().then(setPosts);
    setActiveFilter('All Posts');
  };

  const getAllCategoryePost = () => {
    getCategories().then(setCategoryPosts);
  };

  const handleCategoryClick = (id, label) => {
    getPostsByCategory(id).then(setPosts);
    setActiveFilter(`Category: ${label}`);
  };

  const getAllUsers = () => {
    getUsers().then(setAuthorPosts);
  };
  const handleAuthorClick = (id, firstName, lastName) => {
    getPostsByUsers(id).then(setPosts);
    setActiveFilter(`Author: ${`${firstName} ${lastName}`}`);
  };

  useEffect(() => {
    getAllPost();
    getAllCategoryePost();
    getAllUsers();
  }, []);

  return (
    <div>
      <Button onClick={() => getAllPost()}>All Post</Button>
      <DropdownButton
        align="end"
        id="dropdown-item-button"
        title="Search by Category"
        className="drop-down-filter"
      >
        {categoryPosts.map((category) => (
          <div key={category.id}>
            <Dropdown.Item as="button" onClick={() => handleCategoryClick(category.id, category.label)}>{category.label}</Dropdown.Item>
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
            <Dropdown.Item as="button" onClick={() => handleAuthorClick(author.id, author.firstName, author.lastName)}>{author.firstName} {author.lastName}</Dropdown.Item>
          </div>
        ))}
      </DropdownButton>
      <h2>Results for {activeFilter}</h2>
      { posts.length <= 0 ? (
        <p>No Posts Available</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPost} />
        ))
      )}
    </div>
  );
}

export default Home;
