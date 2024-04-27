import UserBookCard from '../components/UserBookCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>welcome  {user.userName} to your Bookshelf~ </h1>
      <UserBookCard />

    </div>
  );
}

export default Home;
