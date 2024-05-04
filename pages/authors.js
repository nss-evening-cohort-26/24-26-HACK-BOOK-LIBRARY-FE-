import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleAuthorAndBooks, getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';
import { useAuth } from '../utils/context/authContext';

export default function Authors() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);

  const getAllAuthors = () => {
    getAuthors().then(setAuthors);
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  const deleteAuthorAndbooks = (authorObj) => {
    if (window.confirm(`Delete ${authorObj.name}, and all of their books?`)) {
      deleteSingleAuthorAndBooks(authorObj).then(() => getAllAuthors());
    }
  };

  return (
    <div className="top-container">
      { user.isAdmin && (
        <Link href="/author/new/" passHref>
          <Button className="button">Add Author</Button>
        </Link>
      )}
      <h1 className="text">Authors</h1>
      <div className="d-flex flex-wrap">
        {authors.map((author) => (
          <AuthorCard key={author.id} authorObj={author} deleteAuthorAndBooks={deleteAuthorAndbooks} />
        ))}
      </div>
    </div>
  );
}
