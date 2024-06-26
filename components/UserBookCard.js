import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { useAuth } from '../utils/context/authContext';
import { getUserBooks, deleteUserBook } from '../api/bookData';

function UserBookCard() {
  const [books, setBooks] = useState([]);

  const { user } = useAuth();

  const getAllUserBooks = () => {
    getUserBooks(user.id).then(setBooks);
    // console.warn(user.id);
  };

  useEffect(() => {
    getAllUserBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteThisUserBook = (bookObj) => {
    if (window.confirm(`Remove ${bookObj.title} from your Bookshelf?`)) {
      deleteUserBook(bookObj.id, user.id).then(() => getAllUserBooks());
    }
  };

  return (
    <div className="d-flex flex-wrap">
      {books.map((book) => (
        <BookCard key={book.id} bookObj={book} onUpdate={getAllUserBooks} deleteBook={() => deleteThisUserBook(book)} location="bookshelf" />
      ))}
    </div>
  );
}

export default UserBookCard;
