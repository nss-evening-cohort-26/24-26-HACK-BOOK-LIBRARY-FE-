import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import { addUserBook } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';

function BookCard({ bookObj, deleteBook, location }) {
  const [hover, setHover] = useState(false);
  const { user } = useAuth();
  console.log('Props in BookCard:', bookObj);
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
        minHeight: '350px',
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
          minHeight: '350px',

        }}
      >
        <Card.Body
          className="card-body"
          style={{
            textAlign: 'center',
            marginTop: '30%',
          }}
        >
          <Card.Title>{bookObj.title}</Card.Title>
          <h5>by {bookObj.authorName}</h5>
          <h5>Published in {bookObj.publishYear}</h5>
          <h5>Genre: {bookObj.genreName}</h5>
          {user.isAdmin ? (
            <>
              <Card.Text>
                <Link href={`/book/${bookObj.id}`} passHref>
                  <Button variant="light" className="m-2">
                    <Image src="/assets/viewicon.png" alt="Edit" width={22} height={22} />
                  </Button>
                </Link>
                <Link href={`/book/edit/${bookObj.id}`} passHref>
                  <Button variant="outline-dark" style={{ backgroundColor: 'black', color: 'white' }}>
                    <Image src="/assets/editicon.png" alt="Edit" width={22} height={22} />
                  </Button>
                </Link>
              </Card.Text>
              <Button
                variant="danger"
                onClick={() => deleteBook(bookObj)}
                className="m-2"
              >
                {location === 'library' ? 'Burn The Book' : 'Remove From Shelf'}
              </Button>
            </>
          ) : (
            location !== 'library' && (
            <Button
              variant="danger"
              onClick={() => deleteBook(bookObj)}
              className="m-2"
            >
              Remove From Shelf
            </Button>
            )
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
    genreName: PropTypes.string,
    authorName: PropTypes.string,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default BookCard;
