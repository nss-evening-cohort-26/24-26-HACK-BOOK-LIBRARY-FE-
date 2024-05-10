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
          <div className="shelf-items text">
            { `${profile.userName}'s Bookshelf` }
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
        <div className="shelf-items text">
          <h3>
            { `${profile.userName}'s Bookshelf` }
          </h3>
          <div className="users-shelf">
            <UserBookshelves user={profile} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUserProfiles;
