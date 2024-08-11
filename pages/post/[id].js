import React from 'react';
import PostDetails from '../../components/PostDetails';
import { getSinglePost } from '../../api/postData';

export default function ViewPostDetails() {
  return (
    <div>
      <PostDetails onUpdate={getSinglePost} />
    </div>
  );
}
