import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  const getAllAuthors = () => {
    getAuthors().then(setAuthors);
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div className="top-container">
      <Link href="/author/new/" passHref>
        <Button>Add Author</Button>
      </Link>
      <h1 className="text">Authors</h1>
      <div className="d-flex flex-wrap">
        {authors.map((author) => (
          <AuthorCard key={author.id} authorObj={author} />
        ))}
      </div>
    </div>
  );
}
