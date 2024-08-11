import React from 'react';
import PostDetails from '../../components/PostDetails';
import { getPosts } from '../../api/postData';

export default function ViewPostDetails() {
  return (
    <div>
      <PostDetails onUpdate={getPosts} />
    </div>
  );
}
