import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSingleBookWithDetails } from '../../api/bookData';
// import BookCard from '../../components/BookCard';
import CommentCard from '../../components/CommentCard';
import { getBooksComments } from '../../api/commentData';
import CommentModalForm from '../../components/forms/CommentModalForm';
// import Rating from '../../components/Rating';
import {
  checkIfUserRatingExists, getAverageRating, postRating, updateRating,
} from '../../api/ratingData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewBook() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [book, setBook] = useState({});
  const [booksComments, setBooksComments] = useState([]);
  const [score, setScore] = useState(0);
  const [value, setValue] = useState(0);
  const [userRating, setUserRating] = useState();

  // const warnMe = () => { // this is a place holder to prevent the prop from throwing a warning
  //   console.warn('delete book warn', book);
  // };

  const getBookDetails = async () => {
    try {
      const bookDetails = await getSingleBookWithDetails(id);
      setBook(bookDetails);

      const comments = await getBooksComments(id);
      setBooksComments(comments);

      const averageRating = await getAverageRating(id);
      setScore(averageRating);

      const existingUserRating = await checkIfUserRatingExists(id, user.id);
      setUserRating(existingUserRating);
    } catch (error) {
      console.error('Failed to fetch book details:', error);
    }
  };

  const postBookRating = (newScore) => {
    const payload = {
      userId: user.id,
      bookId: id,
      score: newScore,
    };
    postRating(payload);
  };

  const updateBookRating = (newScore) => {
    const updatedPayload = {
      userId: user.id,
      bookId: id,
      score: newScore,
    };
    updateRating(user.id, id, updatedPayload);
  };

  useEffect(() => {
    getBookDetails();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, score, userRating, postRating, value]);

  return (
    <div className="box">
      <div className="card-display">
        <div className="info-box">
          <div className="image-container">
            <Image src={book.bookCover} />
          </div>
          <div className="info-container" style={{ textAlign: 'center' }}>{/* code realted to author, Pubyear, genre, and total rating go in this div */}
            <h6 style={{
              backgroundColor: '#7B2D26',
              textAlign: 'center',
              color: '#F0F3F5',
            }}
            >{book.title}
            </h6>

            <p>Genre: {book.genreName} </p>
            <p>Year Published: {book.publishYear}</p>
            <p>Overall Rating: <Rating
              name="bookAverageRating"
              value={score}
              readOnly
            />
            </p>
          </div>
        </div>
        {userRating ? (
          <div className="rate-box updateRating"> {/* code realated to the rating, buttons, or description should go in this div */}
            My rating:
            <Rating
              name="updateRating"
              value={userRating}
              onChange={(event, newValue) => {
                setValue(newValue);
                updateBookRating(newValue);
                getBookDetails();
                checkIfUserRatingExists(id, user.id);
              }}
            />
          </div>
        ) : (
          <div className="rate-box postRating"> {/* code realated to the rating, buttons, or description should go in this div */}
            My rating:
            <Rating
              name="postRating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                postBookRating(newValue);
                getBookDetails();
                checkIfUserRatingExists(id, user.id);
              }}
            />
          </div>
        )}

      </div>
      <div className="comment-display">
        {booksComments.map((comment) => (
          <CommentCard key={comment.id} commentObj={comment} onUpdate={getBookDetails} />
        ))}
        <CommentModalForm onUpdate={getBookDetails} />
      </div>
    </div>
  );
}
