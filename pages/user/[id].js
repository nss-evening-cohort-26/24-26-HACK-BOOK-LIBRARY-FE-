import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import UserCard from '../../components/UserCard';
import { getSingleUser } from '../../api/userData';
import UserBookshelves from '../../components/UserBookshelves';

function ViewUserProfiles() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setProfile);
  }, [id]);

  if (id !== user.id.toString()) {
    return (
      <>
        <div className="profile-shelf">
          <div className="profile-info">
            <h1>{profile.userName} </h1>
            <UserCard userObj={profile} />
          </div>
          <div className="shelf-items">
            <div className="user-review text">
              {" other user's ratings of books"}
            </div>
            <div className="users-shelf">
              <UserBookshelves user={profile} />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="profile-shelf">
        <div className="profile-info">
          <h1>{profile.userName} </h1>
          <UserCard userObj={profile} />
        </div>
        <div className="shelf-items">
          <div className="user-review">
            My reviews
          </div>
          <div className="users-shelf">
            <UserBookshelves user={profile} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUserProfiles;
