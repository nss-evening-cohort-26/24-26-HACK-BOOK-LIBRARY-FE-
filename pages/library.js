import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import { deleteBook, getBooks } from '../api/bookData';

export default function Library() {
  const [books, setBooks] = useState([]);

  const getAllTheBooks = () => {
    getBooks().then(setBooks);
    // console.warn();
  };

  useEffect(() => {
    getAllTheBooks();
  }, []);

  const deleteThisLibraryBook = (bookObj) => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      deleteBook(bookObj.id).then(() => getAllTheBooks());
      console.warn('Sorry! Only Admins can delete books from the library!');
    }
  };

  return (
    <>
      <Link href="/book/new/" passHref>
        <Button className="button">Add Book</Button>
      </Link>
      <h4 className="text">Be quite in the god damn Library!</h4>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.id} bookObj={book} onUpdate={getAllTheBooks} deleteBook={deleteThisLibraryBook} location="library" />
        ))}
      </div>
    </>
  );
}
