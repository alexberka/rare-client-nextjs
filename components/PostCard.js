import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUserById } from '../api/userData';
import { getSingleCategory } from '../api/categoryData';
import { deletePost } from '../api/postData';

export default function PostCard({ postObj, onUpdate }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState(null);
  const router = useRouter();

  const getUser = () => {
    getUserById(postObj.userId).then(setUser);
  };

  const getCategory = () => {
    getSingleCategory(postObj.categoryId).then(setCategory);
  };

  const deleteThisPost = () => {
    if (window.confirm(`Are you sure you want to delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  const newDate = new Date(postObj.publicationDate);
  const readableDate = newDate.toUTCString();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
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
          <div className="flex">
            <Link href={`/post/${postObj.id}`} passHref>
              <Card.Title style={{ cursor: 'pointer' }} className="post-card-title">{postObj.title}</Card.Title>
            </Link>
            <div className="menu-container">
              <button type="button" className="menu-button" onClick={toggleDropdown} aria-label="Open options menu">
                <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </button>
              {isDropdownVisible && (
              <div className="dropdown-menu" style={{ display: 'block' }}>
                <button type="button" className="dropdown-item" onClick={() => { router.push(`/post/edit/${postObj.id}`); }}>
                  <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7029 1.87868L10.1171 0.292893C9.72658 -0.0976311 9.09342 -0.0976311 8.70289 0.292893L7.499 1.495L10.499 4.495L11.7029 3.29289C12.0934 2.90237 12.0934 2.2692 11.7029 1.87868ZM9.085 5.909L6.085 2.909L0 8.995V12H2.994L9.085 5.909Z" fill="black" />
                  </svg>
                  Edit Post
                </button>
                <button type="button" className="dropdown-item delete" onClick={deleteThisPost}>
                  <span className="comment-icon">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1V0H4V1H1V3H11V1H8ZM9.33333 12L10 4H2L2.66667 12H9.33333Z" fill="black" />
                    </svg>
                  </span>
                  Delete
                </button>
              </div>
              )}
            </div>
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            {user?.firstName} {user?.lastName}
          </Card.Subtitle>
          <Card.Text>{category?.label}</Card.Text>
          <Card.Text>{readableDate}</Card.Text>
          <div className="post-card-tags-container flex">
            {postObj.tags?.map((tag) => (
              <Badge bg="info">{tag.label}</Badge>
            ))}
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
    id: PropTypes.number,
    tags: PropTypes.shape([]),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
