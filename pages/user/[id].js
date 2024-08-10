import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUserById } from '../../api/userData';
import { getPostsByUsers } from '../../api/postData';
import PostCard from '../../components/PostCard';

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getUserById(id).then(setUser);
    getPostsByUsers(id).then(setUserPosts);
  }, [id]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th scope="row">Full name</th>
            <td>{user.firstName} {user.lastName}</td>
          </tr>
          <tr>
            <th scope="row">Username</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th scope="row">Creation date</th>
            <td>{user.createdOn}</td>
          </tr>
          <tr>
            <th scope="row">Bio</th>
            <td>{user.bio}</td>
          </tr>
        </tbody>
      </Table>
      <div>
        {userPosts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getPostsByUsers} />
        ))}
      </div>
    </>
  );
}
