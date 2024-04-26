import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import { getBooks } from '../api/bookData';

export default function Library() {
  const [books, setBooks] = useState([]);

  const getAllTheBooks = () => {
    getBooks().then(setBooks);
    console.warn();
  };

  useEffect(() => {
    getAllTheBooks();
  }, []);

  // const deleteThisLibraryBook = ({ bookObj }) => {
  //   if (window.confirm(`Delete ${bookObj.title}?`)) {
  //     deleteBook(bookObj.firebaseKey).then(() => getAllTheBooks());
  //   }
  // };

  return (
    <>
      <div>library</div>
      <Button>Add Book</Button>
      <Button>Add Author</Button>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.id} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </>
  );
}
