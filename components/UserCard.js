/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { updateUser } from '../api/userData';

function UserCard({ userObj }) {
  const { user } = useAuth();
  const [tempUser, setTempUser] = useState();
  const [editMode, setEditMode] = useState(false);
  const isCurrentUserProfile = user.uid === userObj.uid;

  useEffect(() => {
    setTempUser(userObj);
  }, [userObj]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({
      ...tempUser,
      [name]: value,
    });
  };

  const updatedProfile = () => {
    updateUser(tempUser).then(setEditMode(false));
  };

  if (isCurrentUserProfile) {
    return (
      <Card className="user-card">
        <Card.Body>
          <div>
            {isCurrentUserProfile ? (
              <Form.Check
                type="switch"
                id="editModeSwitch"
                label="Edit Profile"
                checked={editMode}
                onChange={() => setEditMode(!editMode)}
              />
            ) : null}
            <Card.Text>
              Email: <input
                type="text"
                name="email"
                value={tempUser?.email || ''}
                onChange={handleInputChange}
                style={{ width: '99%' }}
                readOnly={!editMode}
              />
            </Card.Text>
            <Card.Text>
              Bio: <textarea
                type="text"
                name="bio"
                value={tempUser?.bio || ''}
                onChange={handleInputChange}
                style={{ width: '99%' }}
                readOnly={!editMode}
              />
            </Card.Text>
          </div>
          {editMode && (
          <Button onClick={updatedProfile} className="addAuthorButton">Save</Button>
          )}
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card className="user-card">
      <Card.Body>
        <div>
          <p>Email: {userObj.email}</p>
          <p>Bio: {userObj.bio}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserCard;

UserCard.propTypes = {
  userObj: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
    userName: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};
