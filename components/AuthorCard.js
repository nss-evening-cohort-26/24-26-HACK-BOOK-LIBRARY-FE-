/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, Image,
} from 'react-bootstrap';
import { getSingleAuthorAndBooks } from '../api/authorData';

export default function AuthorCard({ authorObj }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ books: [] });

  useEffect(() => {
    getSingleAuthorAndBooks(authorObj.id).then((responseData) => {
      setData(responseData);
    });
  }, [authorObj.id]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{authorObj.name}</Card.Title>
        <Link href={`/author/edit/${authorObj.id}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" className="m-2">
          Delete
        </Button>
        <Button
          className="bookBtn"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Author's books
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            {data.books.map((book) => (
              <div key={book.id}>
                <Link passHref href={`/book/${book.id}`}>
                  <div style={{ cursor: 'pointer' }}>
                    <Image src={book.bookCover} alt={book.title} style={{ width: '50px', height: 'auto' }} />
                    {book.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    books: PropTypes.string,
  }).isRequired,
};
