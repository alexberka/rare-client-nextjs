import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { getPosts } from '../api/postData';

function Home() {
  const [posts, setPosts] = useState([]);

  const getAllPost = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} />
      ))}
    </div>
  );
}

export default Home;
