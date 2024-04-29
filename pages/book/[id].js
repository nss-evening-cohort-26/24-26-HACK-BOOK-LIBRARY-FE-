import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleBook } from '../../api/bookData';
import { getSingleAuthor } from '../../api/authorData';

export default function ViewBook() {
  const [bookDetails, setBookDetails] = useState({});
  const [author, setAuthor] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id)
      .then((bookData) => {
        setBookDetails(bookData);
      });
  }, [id]);

  useEffect(() => {
    if (bookDetails.authorId) {
      getSingleAuthor(bookDetails.authorId)
        .then((authorData) => {
          setAuthor(authorData);
        });
    }
  }, [bookDetails.authorId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h1>{bookDetails.title}</h1>
        </Card.Title>
        <Card.Img variant="top" src={bookDetails.bookCover} style={{ width: '33.33%', minWidth: '200px', maxWidth: '400px' }} />
        <p>Written by: {author.name}, Published in {bookDetails.publishYear} </p>
        <Link passHref href={`/comment/${id}`}>
          <Button variant="primary"> Go to Comments</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
