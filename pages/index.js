import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PostCard from '../components/PostCard';
import { getPosts, getPostsByCategory } from '../api/postData';
import { getCategories } from '../api/categoryData';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setcategories] = useState([]);

  const getAllPost = () => {
    getPosts().then(setPosts);
  };

  const getAllCategories = () => {
    getCategories().then(setcategories);
  };

  const handleCategoryClick = (id) => {
    getPostsByCategory(id).then(setPosts);
  };

  useEffect(() => {
    getAllPost();
    getAllCategories();
  }, []);

  return (
    <div>
      <DropdownButton
        align="end"
        id="dropdown-item-button"
        title="Search by Category"
        className="drop-down-filter"
      >
        {categories.map((category) => (
          <div key={category.id}>
            <Dropdown.Item as="button" onClick={() => handleCategoryClick(category.id)}>{category.label}</Dropdown.Item>
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
