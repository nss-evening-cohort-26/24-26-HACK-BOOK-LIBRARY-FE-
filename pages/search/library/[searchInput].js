import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchBooks } from '../../../api/searchData';
import BookCard from '../../../components/BookCard';
import SearchBar from '../../../components/SearchBar';

export default function Search() {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;
  console.warn(searchInput);

  const searchAllBooks = () => {
    searchBooks(searchInput).then(setFilteredBooks);
  };

  useEffect(() => {
    searchAllBooks();
  }, [searchInput]);

  return (
    <>
      <SearchBar location="library" />
      <h2 style={{ color: 'whitesmoke' }}>Book Results</h2>
      <div className="d-flex flex-wrap">
        {filteredBooks.length > 0 ? filteredBooks.map((book) => <BookCard key={book.id} bookObj={book} location="library" onUpdate={searchAllBooks} />) : <h4 style={{ color: 'whitesmoke' }}>No Books Found</h4> }
      </div>
    </>
  );
}
