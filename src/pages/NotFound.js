import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary">Go to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;