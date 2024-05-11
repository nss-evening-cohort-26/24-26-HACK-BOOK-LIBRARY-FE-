import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteComment } from '../api/commentData';

export default function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(commentObj.id).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card className="comment-card">
      <Card.Header id="comment-card-header">
        <Link href={`/user/${commentObj.commentsUserId}`}>
          {commentObj.commentsUserName}
        </Link>
        {' '}posted on:  {new Date(commentObj.datePosted).toLocaleDateString()}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {commentObj.content}
        </Card.Text>
        <Card.Text style={{ display: 'flex', justifyContent: 'center' }}>
          {commentObj.commentsUserId === user.id ? <Button variant="danger" onClick={deleteThisComment}><Image src="/assets/deleteicon.png" alt="Edit" width={22} height={22} /></Button> : <p> </p>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    commentsUserId: PropTypes.number,
    content: PropTypes.string,
    datePosted: PropTypes.string,
    commentsUserName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
