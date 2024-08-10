import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, Card } from 'react-bootstrap';
import { getSinglePost } from '../api/postData';

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

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
        </Card.Body>
      </Card>
    </div>
  );
}
