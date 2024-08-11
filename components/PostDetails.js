import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Badge, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deletePost, getSinglePost } from '../api/postData';

export default function PostDetails({ onUpdate }) {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm('Delete?')) {
      deletePost(postDetails.id).then(() => {
        onUpdate();
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <Card className="post-details ms-5">
        <Card.Body>
          <Badge bg="secondary">
            {postDetails.user?.firstName} {postDetails.user?.lastName}
          </Badge>
          <Card.Title>{postDetails?.title}</Card.Title>
          <Card.Text>{postDetails?.content}</Card.Text>
          <Badge bg="secondary">{postDetails.category?.label}</Badge>
          <Badge bg="secondary">{postDetails.publicationDate}</Badge>
          <div className="">
            <Link href={`/post/edit/${postDetails.id}`} passHref>
              <Button
                style={{
                  backgroundColor: '#90a955',
                  border: 'none',
                }}
              >
                ✏️
              </Button>
            </Link>
            <Button
              style={{
                backgroundColor: '#ef5d60',
                border: 'none',
              }}
              className="m-2"
              onClick={deleteThisPost}
            >
              🗑️
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

PostDetails.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
