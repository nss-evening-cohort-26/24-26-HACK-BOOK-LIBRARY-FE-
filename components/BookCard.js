import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { addUserBook } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import { getSingleAuthor } from '../api/authorData';
import { getSingleGenre } from '../api/genreData';

function BookCard({ bookObj, deleteBook, location }) {
  const [author, setAuthor] = useState({});
  const [genre, setGenre] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      const authorData = await getSingleAuthor(bookObj.authorId);
      setAuthor(authorData);
    };

    const getGenre = async () => {
      const genreData = await getSingleGenre(bookObj.genreId);
      setGenre(genreData);
    };

    getAuthor();
    getGenre();
  }, [bookObj]);
  const { user } = useAuth();

  const addThisBookToBookshelf = () => {
    const payload = {
      bookId: bookObj.id,
      userId: user.id,
    };
    // console.warn(payload);
    addUserBook(payload);
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.bookCover} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>

        {author ? <h5>{author.name}</h5> : ''}

        <h5>{bookObj.publishYear}</h5>

        {genre ? <h5>Genre: {genre.genreName}</h5> : ''}

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
    publishYear: PropTypes.number,
    authorId: PropTypes.number,
    genreId: PropTypes.number,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default BookCard;
