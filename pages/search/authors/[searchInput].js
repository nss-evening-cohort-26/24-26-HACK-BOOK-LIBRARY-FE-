import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchAuthors } from '../../../api/searchData';
import AuthorCard from '../../../components/AuthorCard';
import SearchBar from '../../../components/SearchBar';

export default function Search() {
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;
  console.warn(searchInput);

  const searchAllAuthors = () => {
    searchAuthors(searchInput).then(setFilteredAuthors);
  };

  useEffect(() => {
    searchAllAuthors();
  }, [searchInput]);

  return (
    <>
      <SearchBar location="authors" />
      <h2 style={{ color: 'whitesmoke' }}>Author Results</h2>
      <div className="d-flex flex-wrap">
        {console.warn(filteredAuthors)}
        {filteredAuthors.length > 0 ? filteredAuthors.map((author) => (
          <AuthorCard key={author.id} authorObj={author} onUpdate={searchAllAuthors} />
        )) : <h4 style={{ color: 'whitesmoke' }}>No Authors Found</h4>}
      </div>
    </>
  );
}
