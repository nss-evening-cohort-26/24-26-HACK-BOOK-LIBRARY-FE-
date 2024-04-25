import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';
import updateUser from '../api/userData';

function RegisterForm({ userObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    uid: user.uid,
    userName: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    if (userObj?.id) {
      setFormData(userObj);
    }
    console.warn(user.uid);
  }, [userObj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj.id) {
      updateUser(formData).then(() => router.push(`/users/${userObj.id}`));
    } else {
      const payload = { ...formData, uid: user?.uid };
      registerUser(payload).then((response) => {
        router.push(`/users/${response.id}`);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <br /><br />
        <h1>{userObj.id ? 'Update' : 'Create'} User Profile</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="userName" value={formData.userName} required placeholder="Enter Username" onChange={handleChange} />
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="text" name="email" value={formData.email} placeholder="Enter email address" onChange={handleChange} required />
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" name="bio" value={formData.bio} placeholder="Enter your bio" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    userName: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
  }),
};

RegisterForm.defaultProps = {
  userObj: {},
};

export default RegisterForm;
