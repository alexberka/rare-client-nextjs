import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [postToEdit, setPostToEdit] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) { getSinglePost(id).then(setPostToEdit); }
  }, [id]);

  return (
    <>
      <PostForm postObj={postToEdit} />
    </>
  );
}
