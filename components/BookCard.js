import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { addUserBook } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';

function BookCard({ bookObj, deleteBook, location }) {
  console.warn(bookObj);

  const { user } = useAuth();

  const addThisBookToBookshelf = () => {
    const payload = {
      bookId: bookObj.id,
      userId: user.id,
    };
    console.warn(payload);
    addUserBook(payload);
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.bookCover} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>
        <Link href={`/book/${bookObj.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/book/edit/${bookObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={() => deleteBook(bookObj)} className="m-2">
          DELETE
        </Button>
        {location === 'library' ? <Button variant="success" onClick={addThisBookToBookshelf} className="m-2">Add to Bookshelf</Button> : '' }
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    bookCover: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default BookCard;
