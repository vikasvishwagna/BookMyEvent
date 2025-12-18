import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-emerald-100 text-emerald-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
    }`;

  return (
    <nav className="bg-gradient-to-r from-emerald-50 to-violet-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-violet-500 text-white font-bold text-xl shadow-sm hover:opacity-90 transition"
        >
          BookMyEvent
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <NavLink to="/" className={linkClass}>
            Events
          </NavLink>

          <NavLink to="/my-events" className={linkClass}>
            My Events
          </NavLink>

          <NavLink to="/joined-events" className={linkClass}>
            Joined
          </NavLink>

          {/* Create Button */}
          <button
            onClick={() => navigate("/create-event")}
            className="ml-3 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 transition"
          >
            + Create
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
