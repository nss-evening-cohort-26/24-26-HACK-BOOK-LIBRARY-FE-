import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { useAuth } from '../utils/context/authContext';
import { getUserBooks, deleteUserBook } from '../api/bookData';

function UserBookCard() {
  const [books, setBooks] = useState([]);

  const { user } = useAuth();

  const getAllUserBooks = () => {
    getUserBooks(user.Id).then(setBooks);
    console.warn(user.Id);
  };

  useEffect(() => {
    getAllUserBooks();
  }, []);

  const deleteThisUserBook = ({ bookObj }) => {
    if (window.confirm(`Delete ${bookObj.Title}?`)) {
      deleteUserBook(bookObj.Id).then(() => getAllUserBooks());
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.Id} bookObj={book} onUpdate={getAllUserBooks} onClick={deleteThisUserBook} />
        ))}
      </div>

    </>
  );
}

export default UserBookCard;
