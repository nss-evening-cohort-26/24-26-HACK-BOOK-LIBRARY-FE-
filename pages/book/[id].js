import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBook } from '../../api/bookData';
import BookCard from '../../components/BookCard';
import CommentCard from '../../components/CommentCard';
import { getBooksComments } from '../../api/commentData';
import CommentModalForm from '../../components/forms/CommentModalForm';

export default function ViewBook() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({});
  const [booksComments, setBooksComments] = useState([]);

  const getBookDetails = () => {
    getSingleBook(id).then(setBook);
    getBooksComments(id).then(setBooksComments);
  };
  console.warn(booksComments);
  useEffect(() => {
    getBookDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      <BookCard key={book.id} bookObj={book} onUpdate={getBookDetails} location="details" />
      {booksComments.map((comment) => (
        <CommentCard key={comment.id} commentObj={comment} onUpdate={getBookDetails} />
      ))}
      <CommentModalForm />
    </div>
  );
}
