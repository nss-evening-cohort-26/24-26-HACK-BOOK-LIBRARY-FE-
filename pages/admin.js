import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
} from '@mui/material';
import { getAllUsers } from '../api/userData';
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

  return (
    <Container className="mt-5">
      {user && user.isAdmin ? (
        <TableContainer component={Paper} sx={{ border: '5px solid black', borderRadius: '8px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{
                backgroundColor: '#D7C9AA', color: '#000', fontWeight: 'bold', border: '2px solid black',
              }}
              >
                <TableCell sx={{ color: 'black', border: '2px solid black', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: 'black', border: '2px solid black', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'black', border: '2px solid black', fontWeight: 'bold' }}>Admin</TableCell>
                <TableCell sx={{ color: 'black', border: '2px solid black', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userItem, index) => (
                <TableRow
                  key={userItem.id}
                  sx={{
                    backgroundColor: index % 2 ? '#D7C9AA' : '#F2E5D7',
                    color: 'black',
                    border: '2px solid black',
                    fontWeight: '600',
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ border: '2px solid black', fontWeight: '600' }}>
                    {userItem.userName}
                  </TableCell>
                  <TableCell sx={{ border: '2px solid black', fontWeight: '600' }}>{userItem.email}</TableCell>
                  <TableCell sx={{ border: '2px solid black', fontWeight: '600' }}>{userItem.isAdmin ? 'Yes' : 'No'}</TableCell>
                  <TableCell sx={{ border: '2px solid black', fontWeight: '600' }}>
                    {!userItem.isAdmin && (
                      <Button variant="contained" color="success" sx={{ borderRadius: '50px' }}>
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
