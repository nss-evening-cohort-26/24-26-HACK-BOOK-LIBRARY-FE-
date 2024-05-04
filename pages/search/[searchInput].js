import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchBooks, searchAuthors } from '../../api/searchData';
import AuthorCard from '../../components/AuthorCard';
import BookCard from '../../components/BookCard';

export default function Search() {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;
  console.warn(searchInput);

  const searchAllBooks = () => {
    searchBooks(searchInput).then(setFilteredBooks);
  };

  const searchAllAuthors = () => {
    searchAuthors(searchInput).then(setFilteredAuthors);
  };

  useEffect(() => {
    searchAllBooks();
    searchAllAuthors();
  }, [searchInput]);

  return (
    <>
      {console.warn(filteredBooks[0])}
      <h2 style={{ color: 'whitesmoke' }}>Author Results</h2>
      <div className="d-flex flex-wrap">
        {console.warn(filteredAuthors)}
        {filteredAuthors.length > 1 ? filteredAuthors.map((author) => (
          <AuthorCard key={author.id} authorObj={author} onUpdate={searchAllAuthors} />
        )) : <h4 style={{ color: 'whitesmoke' }}>No Authors Found</h4>}
      </div>
      <h2 style={{ color: 'whitesmoke' }}>Book Results</h2>
      <div className="d-flex flex-wrap">
        {filteredBooks.length > 1 ? filteredBooks.map((book) => <BookCard key={book.id} bookObj={book} onUpdate={searchAllBooks} />) : <h4 style={{ color: 'whitesmoke' }}>No Books Found</h4> }
      </div>
    </>
  );
}
