import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import deleteComment from '../api/commentData';

export default function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(commentObj.id).then(() => {
        onUpdate();
        router.push(`/book/${commentObj.id}`);
      });
    }
  };
  return (
    <Card>
      <Card.Header>{commentObj.commentsUserName}</Card.Header>
      <Card.Body>
        <Card.Text>
          {commentObj.content}
        </Card.Text>
        {commentObj.commentsUserId === user.Id ? <Button variant="danger" onClick={deleteThisComment}>Delete</Button> : <p> </p>}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    commentsUserId: PropTypes.number,
    content: PropTypes.string,
    datePosted: PropTypes.instanceOf(Date),
    commentsUserName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
