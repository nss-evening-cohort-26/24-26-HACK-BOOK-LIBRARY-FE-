import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getSingleBook } from '../../api/bookData';
// import BookCard from '../../components/BookCard';
import CommentCard from '../../components/CommentCard';
import { getBooksComments } from '../../api/commentData';
import CommentModalForm from '../../components/forms/CommentModalForm';
import Rating from '../../components/Rating';

export default function ViewBook() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({});
  const [booksComments, setBooksComments] = useState([]);

  // const warnMe = () => { // this is a place holder to prevent the prop from throwing a warning
  //   console.warn('delete book warn', book);
  // };

  const getBookDetails = () => {
    getSingleBook(id).then(setBook);
    getBooksComments(id).then(setBooksComments);
    console.warn('contents of book in Details', book);
  };
  console.warn('bookComments data', booksComments);
  useEffect(() => {
    getBookDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="box">
      <div className="card-display">
        <div className="info-box">
          <div className="image-container">
            <Image src={book.bookCover} />
          </div>
          <div className="info-container">{/* code realted to author, Pubyear, genre, and total rating go in this div */}
            <p>Author</p>
            <p>Genre</p>
            <p>Publish</p>
            <p>Overall Rating</p>
          </div>
        </div>
        <div className="rate-box"> {/* code realated to the rating, buttons, or description should go in this div */}
          My rating
          <Rating />
        </div>
      </div>
      <div className="comment-display">
        comments div
        {booksComments.map((comment) => (
          <CommentCard key={comment.id} commentObj={comment} onUpdate={getBookDetails} />
        ))}
        <CommentModalForm onUpdate={getBookDetails} />
      </div>
    </div>
  );
}
