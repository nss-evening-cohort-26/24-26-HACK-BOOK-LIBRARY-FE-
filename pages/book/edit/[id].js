import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleBook } from '../../../api/bookData';
import BookForm from '../../../components/forms/BookForm';

export default function EditBook() {
  const [editBook, setEditBook] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setEditBook);
  }, [id]);

  return (<BookForm obj={editBook} />);
}
