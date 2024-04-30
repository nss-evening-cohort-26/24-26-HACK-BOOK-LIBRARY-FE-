import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createComment, editComment } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  content: ' ',
};

function CommentModalForm({ commentObj }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (commentObj.id) {
      setFormInput(commentObj);
    }
  }, [commentObj.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      userId: user.id,
      bookId: id,
      datePosted: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentObj.id) {
      editComment(commentObj.id, formInput).then(() => router.push(`/book/${id}`)).then(handleClose);
    } else {
      createComment(formInput).then(() => router.push(`/book/${id}`)).then(handleClose);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group md="4" controlId="validationCustom02">
              <Form.Label className="text">Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your comment"
                name="content"
                onChange={handleChange}
                value={formInput.content}
              />
            </Form.Group>
            <Button className="form-button button" type="submit">Add Comment</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CommentModalForm.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    bookId: PropTypes.number,
    userId: PropTypes.number,
    content: PropTypes.string,
  }),
};

CommentModalForm.defaultProps = {
  commentObj: initialState,
};

export default CommentModalForm;
