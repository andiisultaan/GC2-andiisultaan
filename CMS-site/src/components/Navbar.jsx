import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUserPlus, faList, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/" className={`${location.pathname === "/" ? "text-blue-500 font-medium" : "text-gray-600 hover:text-blue-500"}`}>
              <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
              Posts
            </Link>
          </li>
          <li>
            <Link to="/categories" className={`${location.pathname === "/categories" ? "text-blue-500 font-medium" : "text-gray-600 hover:text-blue-500"}`}>
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Categories
            </Link>
          </li>
          <li>
            <Link to="/add-user" className={`${location.pathname === "/add-user" ? "text-blue-500 font-medium" : "text-gray-600 hover:text-blue-500"}`}>
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Add User
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout} className="text-gray-600 font-bold hover:text-blue-500">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
