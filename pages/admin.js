import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
} from '@mui/material';
import { getAllUsers, makeUserAdmin } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

const AdminControlPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    }).catch((error) => {
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
      {user && user.isAdmin ? (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '15px',
            overflow: 'hidden',
            border: '3px solid black',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{
                backgroundColor: '#D7C9AA',
                color: '#000',
                fontWeight: 600,
                borderBottom: '2px solid black',
              }}
              >
                <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Admin</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userItem, index) => (
                <TableRow
                  key={userItem.id}
                  sx={{
                    backgroundColor: index % 2 ? '#D7C9AA' : '#F2E5D7',
                    color: 'black',
                    fontWeight: 600,
                    height: '75px',
                    '&:not(:last-child)': {
                      borderBottom: '2px solid black',
                    },
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                    {userItem.userName}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{userItem.email}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{userItem.isAdmin ? 'Yes' : 'No'}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {!userItem.isAdmin && (
                      <Button
                        onClick={() => handleMakeAdmin(userItem.id)}
                        variant="contained"
                        sx={{
                          fontWeight: 600,
                          backgroundColor: 'green',
                          color: '#FFFFFF',
                          borderColor: 'white',
                          borderWidth: '5px',
                          borderStyle: 'solid',
                          borderRadius: '50px',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: 'darkgreen',
                            borderColor: 'white',
                          },
                        }}
                      >
                        Make Admin
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>You do not have access to this panel.</div>
      )}
    </Container>
  );
};

export default AdminControlPanel;
