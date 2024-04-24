import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function CommentForm() {
  const [formInput] = useState({});
  return (
    <Form>
      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your comment"
          name="content"
          value={formInput.content}
        />
      </Form.Group>
      <Button className="form-button button" type="submit">TO CHANGE</Button>
    </Form>
  );
}
