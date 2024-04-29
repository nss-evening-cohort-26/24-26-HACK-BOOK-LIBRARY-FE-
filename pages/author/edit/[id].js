import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AuthorForm from '../../../components/forms/AuthorForm';
import { getSingleAuthor } from '../../../api/authorData';

export default function EditAuthor() {
  const [editAuthor, setEditAuthor] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleAuthor(id).then(setEditAuthor);
  }, [id]);

  return (<AuthorForm obj={editAuthor} />);
}
