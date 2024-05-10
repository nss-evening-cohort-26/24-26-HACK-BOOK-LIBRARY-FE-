import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useRouter } from 'next/router';
import { getGenres } from '../../api/genreData';
import { createBook, updateBook } from '../../api/bookData';
import { getAuthors } from '../../api/authorData';

const initialState = {
  bookCover: '',
  genreId: 0,
  AuthorId: 0,
  publishYear: '',
  title: '',
};

export default function BookForm({ obj }) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const [genres, setGenre] = useState([]);
  const [authors, setAuthors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGenres().then(setGenre);
  }, [obj]);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, [obj]);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    if (obj.id) {
      updateBook(payload).then(() => router.push('/library'));
    } else {
      createBook(payload).then(() => {
        router.push('/library');
      });
    }
  };

  return (
    <Form className=" bookForm" onSubmit={handleSubmit}>
      <h3 className="text">{obj.id ? 'Update' : 'Create'} Book</h3>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">Book Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Book Cover</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter image URL"
          name="bookCover"
          value={formInput.bookCover}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">Publish Year</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Enter Year Published"
          name="publishYear"
          value={formInput.publishYear}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Author</Form.Label>
        <Form.Select
          required
          type="number"
          placeholder="Select Author"
          name="authorId"
          value={formInput.authorId}
          onChange={handleChange}
        >
          <option value="">Select the Author</option>
          {
            authors.map((author) => (
              <option
                key={author.id}
                value={author.id}
              >
                {author.name}
              </option>
            ))
        }
        </Form.Select>
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Genre</Form.Label>
        <Form.Select
          required
          type="number"
          placeholder="Enter book genre"
          name="genreId"
          value={formInput.genreId}
          onChange={handleChange}
        >
          <option value="">Select a Genre</option>
          {
            genres.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
              >
                {genre.genreName}
              </option>
            ))
        }
        </Form.Select>
      </Form.Group>
      <div className="submitButtonDiv">
        <Button className="submitAuthorButton" type="submit">{obj.id ? 'Update' : 'Create'} Book</Button>
      </div>
    </Form>
  );
}

BookForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    bookCover: PropTypes.string,
    genreId: PropTypes.number,
    authorId: PropTypes.number,
    publishYear: PropTypes.number,
  }),
};

BookForm.defaultProps = {
  obj: initialState,
};
