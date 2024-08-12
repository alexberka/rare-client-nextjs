import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Link from 'next/link';
import { getUsers } from '../api/userData';

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="table-container">
      <h2 className="title">Users</h2>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={`user-${u.id}`}>
              <th scope="row">
                <Link passHref href={`/user/${u.id}`}>{u.username}</Link>
              </th>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
