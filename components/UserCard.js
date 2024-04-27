/* eslint-disable react/no-unescaped-entities */
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

export default function UserCard({ userObj }) {
  const { user } = useAuth();
  const isCurrentUserProfile = user.uid === userObj.uid;

  return (
    <Card className="user-card" style={{ width: '48rem' }}>
      <Card.Body>
        <Card.Title variant="top">{userObj.userName}'s Bookshelf</Card.Title>
        <Card.Text>Email: {userObj.email}</Card.Text>
        <Card.Text>Bio: {userObj.bio}</Card.Text>
        {isCurrentUserProfile && (
          <Card.Text><Link href={`/user/edit/${userObj.id}`} passHref><Button variant="outline-light">Edit Profile</Button></Link></Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
    userName: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};