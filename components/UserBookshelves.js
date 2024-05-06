import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getUserBooks } from '../api/bookData';

export default function UserBookshelves({ user }) {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    getUserBooks(user.id).then(setBookshelf);
  }, [user.id]);

  return (
    <>
      {bookshelf.map((book) => (
        <Card
          key={book.id}
          style={{
            border: '1px solid', backgroundColor: 'rgb(29, 27, 27)', margin: '5px', display: 'flex', alignItems: 'center',
          }}
        >
          <Link passHref href={`/book/${book.id}`}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Card.Img
                style={{
                  margin: '2px', width: '60px', height: '100px',
                }}
                src={book.bookCover}
                alt={book.title}
              />
              <Card.Body className="text">
                {book.title}
              </Card.Body>
            </div>
          </Link>
        </Card>
      ))}
    </>
  );
}

UserBookshelves.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
