// import { useState, useEffect } from 'react';
// import BookCard from '../components/BookCard';
import { useAuth } from '../utils/context/authContext';
// import { getBooks, deleteUserBook } from '../api/bookData';

function Home() {
  // const [books, setBooks] = useState([]);

  const { user } = useAuth();

  // const getAllTheBooks = () => {
  //   getBooks(user.uid).then(setBooks);
  //   console.warn(user.uid);
  // };

  // useEffect(() => {
  //   getAllTheBooks();
  // }, []);

  // const deleteThisUserBook = ({ bookObj }) => {
  //   if (window.confirm(`Delete ${bookObj.title}?`)) {
  //     deleteUserBook(bookObj.firebaseKey).then(() => getAllTheBooks());
  //   }
  // };

  return (
    <div>
      <h1>welcome  {user.displayName} to your Bookshelf~ </h1>
      {/* <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.id} bookObj={book} onUpdate={getAllTheBooks} onClick={deleteThisUserBook} />
        ))}
      </div> */}

    </div>
  );
}

export default Home;
