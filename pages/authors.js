import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';
import { useAuth } from '../utils/context/authContext';
import SearchBar from '../components/SearchBar';

export default function Authors() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);

  const getAllAuthors = () => {
    getAuthors().then(setAuthors);
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <>
      <SearchBar location="authors" />

      <div className="top-container">
        { user.isAdmin && (
          <Link href="/author/new/" passHref>
            <Button className="button">Add Author</Button>
          </Link>
        )}
        <h1 className="text">Authors</h1>
        <div className="d-flex flex-wrap">
          {authors.map((author) => (
            <AuthorCard key={author.id} authorObj={author} />
          ))}
        </div>
      </div>
    </>

  );
}
