import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../api/userData';
import UserCard from '../../components/UserCard';

export default function ViewUserBookShelf() {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleUser(id).then(setUserInfo);
    }
  }, [id]);

  return (
    <>
      <div className="user-container">
        <UserCard userObj={userInfo} onUpdate={setUserInfo} />
      </div>
      <hr
        style={{
          backgroundColor: 'white',
          color: 'white',
          borderColor: 'white',
          height: '2px',
        }}
      />
      <div className="container">
        <h2>Books</h2>
        <br /><br />
      </div>
    </>
  );
}
