import RegisterForm from '../components/RegisterForm';
import UserBookCard from '../components/UserBookCard';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const { user } = useAuth();
  const isUser = user?.id;

  // directs new users to a few user form
  if (!isUser) {
    return (
      <RegisterForm />
    );
  }

  return (
    <>
      <div />
      <div className="container">
        <h2 className="text">Your Bookshelf</h2>
        <hr
          style={{
            backgroundColor: 'white',
            color: 'white',
            borderColor: 'white',
            height: '2px',
          }}
        />
        <UserBookCard />
        <br /><br />
      </div>
    </>
  );
}
