import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

const initialState = {
  bookCover: '',
  genreId: '',
  publishYear: '',
  title: '',
};

export default function BookForm({ obj }) {
  const [formInput] = useState({});

  return (
    <Form className="custom-form">
      <h3 className="text">--BOOK FORM INPUT--</h3>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formInput.title}
         // onChange={handleChange}
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
          // onChange={handleChange}
        />
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">GENRE INPUT TO</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Genre"
          name="genreId"
          value={formInput.genreId}
          // onChange={handleChange}
        />

      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Genre</Form.Label>
        <Form.Select
          required
          type="text"
          placeholder="Enter book genre"
          name="genreId"
          value={formInput.genreId}
          // onChange={handleChange}
        >
          <option value="">Select a Genre</option>
          {
        }
        </Form.Select>
      </Form.Group>
      <Button className="form-button button" type="submit">{obj.id ? 'Update' : 'Create'}</Button>
    </Form>
  );
}

BookForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes,
    title: PropTypes.string,
    bookCover: PropTypes.string,
    genreId: PropTypes.string,
    publishYear: PropTypes.string,
  }),
};

BookForm.defaultProps = {
  obj: initialState,
};
