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
  const [hover, setHover] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getAuthor = async () => {
      if (bookObj.authorId) {
        const authorData = await getSingleAuthor(bookObj.authorId);
        setAuthor(authorData);
      }
    };

    const getGenre = async () => {
      if (bookObj.genreId) {
        const genreData = await getSingleGenre(bookObj.genreId);
        setGenre(genreData);
      }
    };

    getAuthor();
    getGenre();
  }, [bookObj]);

  const addThisBookToBookshelf = () => {
    window.alert('Book added to bookshelf!');
    const payload = {
      bookId: bookObj.id,
      userId: user.id,
    };
    // console.warn(payload);
    addUserBook(payload);
  };

  return (
    <Card
      style={{
        backgroundImage: 'url(https://img.freepik.com/free-photo/wooden-floor-background_53876-88628.jpg)',
        borderRadius: '5px',
        position: 'relative',
        backgroundSize: 'cover',
        width: '18rem',
        margin: '10px',
        border: '0px',
        boxShadow: '5px 5px 10px 2px rgba(17, 14, 14, 0.979)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        opacity: hover ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
      >
        <Card.Img
          variant="top"
          src={bookObj.bookCover}
          alt={bookObj.title}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Card.Body className="card-body">
          <Card.Title>{bookObj.title}</Card.Title>
        </Card.Body>
      </div>
      <div
        style={{
          borderRadius: '5px',
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.3s ease',
          backgroundImage: 'url(https://img.freepik.com/free-photo/wooden-floor-background_53876-88628.jpg)',
          backgroundSize: 'cover',

        }}
      >
        <Card.Body
          className="card-body"
          style={{
            textAlign: 'center',
            marginTop: '30%',
          }}
        >
          {author && <h5>{author.name}</h5>}
          <h5>{bookObj.publishYear}</h5>
          {genre && <h5>Genre: {genre.genreName}</h5>}
          <Link href={`/book/${bookObj.id}`} passHref>
            <Button variant="primary" className="m-2">
              VIEW
            </Button>
          </Link>
          {user.isAdmin && (
            <div>

              <Link href={`/book/edit/${bookObj.id}`} passHref>
                <Button variant="info" className="m-2">
                  EDIT
                </Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => deleteBook(bookObj)}
                className="m-2"
              >
                {location === 'library' ? 'Burn The Book' : 'Remove From Shelf'}
              </Button>
            </div>
          )}
          {location === 'library' && (
            <Button
              variant="success"
              onClick={addThisBookToBookshelf}
              className="m-2"
            >
              Add to Bookshelf
            </Button>
          )}
        </Card.Body>
      </div>
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
