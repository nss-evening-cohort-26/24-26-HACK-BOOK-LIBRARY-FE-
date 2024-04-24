import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function NewUserForm() {
  const [formInput] = useState({});

  return (
    <Form className="custom-form">
      <h3 className="text">--NEW USER FORM INPUT CHANGE ME--</h3>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">User Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter User Name"
          name="userName"
          value={formInput.userName}
         // onChange={handleChange}
        />
      </Form.Group>
      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Email</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter your Email"
          name="email"
          value={formInput.email}
          // onChange={handleChange}
        />
      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Bio</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Who are you.... Like really😳🍃"
          name="genreId"
          value={formInput.genreId}
          // onChange={handleChange}
        />
      </Form.Group>
      <Button className="form-button button" type="submit">TO CHANGE</Button>
    </Form>
  );
}
