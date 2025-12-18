import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-rose-600 mb-2">
            BookMyEvent
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Discover, create, and join amazing events around you.
            Simple. Fast. Beautiful.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="text-gray-600 hover:text-rose-600">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-events" className="text-gray-600 hover:text-rose-600">
                My Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/joined-events" className="text-gray-600 hover:text-rose-600">
                Joined Events
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Platform
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Built with React & Tailwind</li>
            <li>Secure Authentication</li>
            <li>Real-time Events</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} BookMyEvent · All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
