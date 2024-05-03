import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { getAllUsers, makeUserAdmin } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

const AdminControlPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
      });
  }, []);

  const handleMakeAdmin = (userId) => {
    makeUserAdmin(userId)
      .then(() => {
        setUsers((prevUsers) => prevUsers.map((u) => {
          if (u.id === userId) {
            return { ...u, isAdmin: true };
          }
          return u;
        }));
      })
      .catch((error) => {
        console.error('Failed to update admin status:', error);
      });
  };

  return (
    <Container className="mt-5">
      {(!user || !user.isAdmin) && <div className="text-white">LOL NOPE</div>}
      {user && user.isAdmin && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem) => (
              <tr key={userItem.id}>
                <td>{userItem.userName}</td>
                <td>{userItem.email}</td>
                <td>{userItem.isAdmin ? 'Admin' : 'User'}</td>
                <td>
                  {!userItem.isAdmin && (
                    <Button variant="warning" onClick={() => handleMakeAdmin(userItem.id)}>
                      Make Admin
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminControlPanel;
