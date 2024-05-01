import React, { useEffect, useState } from 'react';
import {
  Button, Container, ListGroup,
} from 'react-bootstrap';
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

      <ListGroup>
        {users.map((userItem) => (
          <ListGroup.Item key={userItem.id} className="bg-dark text-white">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5>{userItem.userName}</h5>
                <p><strong>Status:</strong> {userItem.isAdmin ? 'Admin' : 'User'}</p>
              </div>
              {!userItem.isAdmin && (
              <Button
                variant="warning"
                onClick={() => handleMakeAdmin(userItem.id)}
              >
                Make Admin
              </Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      )}
    </Container>
  );
};

export default AdminControlPanel;
