import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchBooks } from '../../api/searchData';
// import AuthorCard from '../../components/AuthorCard';
import BookCard from '../../components/BookCard';

export default function Search() {
  const [filteredBooks, setFilteredBooks] = useState();
  // const [filteredAuthors, setFilteredAuthors] = useState();
  const router = useRouter();
  const { searchInput } = router.query;
  console.warn(searchInput);

  const searchAllBooks = () => {
    searchBooks(searchInput).then(setFilteredBooks);
  };

  // const searchAllAuthors = () => {
  //   searchAuthors(searchInput).then(setFilteredAuthors);
  // };

  useEffect(() => {
    searchAllBooks();
    // searchAllAuthors();
  }, [searchInput]);

  return (
    <>
      {/* <div className="d-flex flex-wrap">
        {filteredAuthors.map((author) => (
          <AuthorCard key={author.id} authorObj={author} />
        ))}
      </div> */}
      <div className="d-flex flex-wrap">
        {filteredBooks.map((book) => <BookCard key={book.id} bookObj={book} onUpdate={searchAllBooks} />)}
      </div>
    </>
  );
}
