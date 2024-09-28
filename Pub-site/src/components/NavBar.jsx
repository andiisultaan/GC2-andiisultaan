import { Link } from "react-router-dom";
import "../assets/css/font.css";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-white px-6 py-4 shadow-md">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl text-gray-800">
            Blogs Web
          </Link>
        </div>
      </nav>
    </>
  );
}
