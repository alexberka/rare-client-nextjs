import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getUserById } from '../api/userData';
import { getSingleCategory } from '../api/categoryData';

export default function PostCard({ postObj }) {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState(null);

  const getUser = () => {
    getUserById(postObj.userId).then(setUser);
  };

  const getCategory = () => {
    getSingleCategory(postObj.categoryId).then(setCategory);
  };

  useEffect(() => {
    getUser();
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{postObj.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user?.firstName} {user?.lastName}
          </Card.Subtitle>
          <Card.Text>{category?.label}</Card.Text>
          <Card.Text>{postObj.publicationDate}</Card.Text>
          <div className="d-flex flex-column align-items-center ml-auto">
            <Link href="/" passHref>
              <Button
                style={{
                  backgroundColor: '#90a955',
                  border: 'none',
                  width: '100%',
                  marginBottom: '5px',
                  marginRight: '0',
                }}
              >
                ✏️
              </Button>
            </Link>
            <Button
              style={{
                backgroundColor: '#ef5d60',
                border: 'none',
                width: '100%',
              }}
              className="m-2"
            >
              🗑️
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    userId: PropTypes.number,
    categoryId: PropTypes.number,
    title: PropTypes.string,
    publicationDate: PropTypes.string,
  }).isRequired,
};
