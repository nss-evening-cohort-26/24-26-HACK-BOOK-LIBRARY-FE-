import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import deleteComment from '../api/commentData';

export default function CommentCard({ bookObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(bookObj.comments.id).then(() => {
        onUpdate();
        router.push(`/book/${bookObj.id}`);
      });
    }
  };
  return (
    <Card>
      <Card.Header>{bookObj.comments.user.userName}</Card.Header>
      <Card.Body>
        <Card.Text>
          {bookObj.comments.content}
        </Card.Text>
        {bookObj.comments.user.id === user.Id ? <Button variant="danger" onClick={deleteThisComment}>Delete</Button> : <p> </p>}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    bookCover: PropTypes.string,
    authorId: PropTypes.number,
    genreId: PropTypes.number,
    publishYear: PropTypes.number,
    comments: PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      bookId: PropTypes.number,
      content: PropTypes.string,
      datePosted: PropTypes.instanceOf(Date),
      user: PropTypes.shape({
        id: PropTypes.number,
        userName: PropTypes.string,
      }),
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
