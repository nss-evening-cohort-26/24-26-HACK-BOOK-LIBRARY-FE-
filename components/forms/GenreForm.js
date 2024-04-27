import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function GenreForm() {
  const [formInput] = useState({});

  return (
    <Form className="custom-form">
      <h3 className="text">--NEW GENRE FORM INPUT CHANGE ME--</h3>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">Genre</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Genre"
          name="genreName"
          value={formInput.genreName}
         // onChange={handleChange}
        />
      </Form.Group>
      <Button className="form-button button" type="submit">Add Genre</Button>
    </Form>
  );
}
