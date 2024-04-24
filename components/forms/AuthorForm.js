import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AuthorForm() {
  const [formInput] = useState({});

  return (
    <Form className="custom-form">
      <h3 className="text">--NEW AUTHOR FORM INPUT CHANGE ME--</h3>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">Author Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Author Name"
          name="name"
          value={formInput.name}
         // onChange={handleChange}
        />
      </Form.Group>
      <Button className="form-button button" type="submit">TO CHANGE</Button>
    </Form>
  );
}
