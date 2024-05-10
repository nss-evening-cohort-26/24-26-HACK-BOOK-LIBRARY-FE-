import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import { deleteBook, getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import SearchBar from '../components/SearchBar';

export default function Library() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [sortType, setSortType] = useState('title');

  const sortBooks = (bookList, currentSortType) => {
    const booksToSort = [...bookList];

    return booksToSort.sort((bookA, bookB) => {
      if (currentSortType === 'rating') {
        return (bookB.averageRating || 0) - (bookA.averageRating || 0);
      }
      return bookA.title.localeCompare(bookB.title);
    });
  };

  const fetchAndSortBooks = async () => {
    const fetchedBooks = await getBooks();
    console.log('Fetched Books:', fetchedBooks);
    const sortedBooks = sortBooks(fetchedBooks, sortType);
    setBooks(sortedBooks);
  };

  const toggleSortType = () => {
    setSortType((prev) => (prev === 'title' ? 'rating' : 'title'));
  };

  useEffect(() => {
    fetchAndSortBooks();
    console.log('Books to render:', books);
  }, [sortType]);

  const deleteThisLibraryBook = (bookObj) => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      deleteBook(bookObj.id).then(() => fetchAndSortBooks());
    }
  };

  return (
    <>
      <SearchBar location="library" />

      <Button className="ratingSortButton" onClick={toggleSortType}>Sort by {sortType === 'title' ? 'Rating' : 'Title'}</Button>
      {user.isAdmin && (
      <Link href="/book/new/" passHref>
        <Button className="addBookButton">Add Book</Button>
      </Link>
      )}
      <h4 className="text">Be quite in the god damn Library!</h4>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.id} bookObj={book} onUpdate={fetchAndSortBooks} deleteBook={deleteThisLibraryBook} location="library" />
        ))}
      </div>
    </>
  );
}
