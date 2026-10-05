import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="state-box">
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className="btn-primary" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
