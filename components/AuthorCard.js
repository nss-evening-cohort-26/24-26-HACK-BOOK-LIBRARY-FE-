/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';
import { getSingleAuthorAndBooks } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';

export default function AuthorCard({ authorObj, deleteAuthorAndBooks }) {
  const [data, setData] = useState({ books: [] });
  const { user } = useAuth();

  useEffect(() => {
    getSingleAuthorAndBooks(authorObj.id).then(setData);
  }, [authorObj.id]);

  return (
    <Card
      className="m-2"
      style={{
        width: '18rem',
        height: '12rem',
        backgroundColor: '#E7DFCE',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '2px 2px 7px 1px rgba(17, 14, 14, 0.979)',
      }}
    >
      <Card.Body className="text-center p-2">
        <Card.Title style={{
          backgroundColor: '#7B2D26',
          borderRadius: '5px',
        }}
        >{authorObj.name}
        </Card.Title>
        <div className="d-flex justify-content-center mb-1">
          {data.books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} passHref>
              <Image
                className="authorBookImg"
                src={book.bookCover}
                alt={book.title}
                style={{
                  width: '50px',
                  height: '75px',
                  margin: '3px',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 10px 1px rgba(17, 14, 14, 0.979)',
                }}
              />
            </Link>
          ))}
        </div>
      </Card.Body>
      {user.isAdmin && (
        <div className="d-flex p-2">
          <Link href={`/author/edit/${authorObj.id}`} passHref>
            <Button variant="outline-dark" style={{ flex: 1, marginRight: '3px', fontWeight: '500' }}>Edit</Button>
          </Link>
          <Button
            variant="outline-dark"
            style={{ flex: 1, marginLeft: '3px', fontWeight: '500' }}
            onClick={() => deleteAuthorAndBooks(authorObj)}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    books: PropTypes.string,
  }).isRequired,
  deleteAuthorAndBooks: PropTypes.func.isRequired,
};
