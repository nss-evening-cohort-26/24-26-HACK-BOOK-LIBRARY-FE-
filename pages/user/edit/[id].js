import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../../api/userData';
import RegisterForm from '../../../components/RegisterForm';

export default function EditUserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleUser(id).then(setUserInfo);
    }
  }, [id]);

  return (
    <RegisterForm userObj={userInfo} />
  );
}
