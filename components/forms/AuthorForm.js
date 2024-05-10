import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createAuthor, updateAuthor } from '../../api/authorData';

const initialState = {
  name: '',
};

export default function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const router = useRouter();

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
      updateAuthor(payload).then(() => router.push('/authors'));
    } else {
      createAuthor(payload).then(() => {
        router.push('/authors');
      });
    }
  };

  return (
    <Form className="authorForm" onSubmit={handleSubmit}>
      <h3 className="text">{obj.id ? 'Update' : 'Create'} Author</h3>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">Author Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Author Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="submitButtonDiv">
        <Button className="form-button button submitAuthorButton" type="submit">{obj.id ? 'Update' : 'Create'} Author</Button>
      </div>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};
