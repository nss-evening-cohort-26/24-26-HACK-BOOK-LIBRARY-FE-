import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, FormControl } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

export default function SearchBar({ location }) {
  const [searchInput, setSearchInput] = useState();
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '' && location === 'library') {
      console.warn('library!');
      router.push(`/search/library/${searchInput}`);
    } else if (searchInput !== '' && location === 'authors') {
      console.warn('authors!');
      router.push(`/search/authors/${searchInput}`);
    }
    setSearchInput('');
  };

  return (
    <Form className="search-bar" onSubmit={handleSubmit}>
      <FormControl type="text" id="search" placeholder={location === 'library' ? 'Search Books by Title, Author, or Genre' : 'Search Authors'} onChange={handleChange} value={searchInput} />
    </Form>
  );
}

SearchBar.propTypes = {
  location: PropTypes.string.isRequired,
};
