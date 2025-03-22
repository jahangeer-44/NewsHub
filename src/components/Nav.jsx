import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); 
   
  const getData = (event) => { 
    event.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Navigate to search page with query as state
    navigate("/searchhandler", { state: { query: searchQuery } });
  };

  return (
    <>
      <div className="container mx-auto flex justify-between items-center pr-6 p-4 bg-blue-900 text-white px-6 py-3 shadow-lg relative">
        <div>
          <NavLink to="/" className="text-2xl font-bold">
            📰 NewsHub
          </NavLink>
        </div>

        <div className="hidden lg:flex space-x-8 justify-center items-center">
          {menuItems()}
        </div>

        <form className="hidden md:flex w-full max-w-xs" onSubmit={getData}>
          <input
            type="text"
            placeholder="Search news..."
            className="bg-white text-black px-3 py-1 rounded-l-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-400 px-3 py-1 text-white rounded-r-md hover:bg-red-600 transition"
          >
            Search
          </button>
        </form>

        <button
          className="lg:hidden focus:outline-none ml-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center space-y-4 py-4 z-50 shadow-md md:hidden">
            {menuItems()}
            <form className="w-full max-w-xs px-4" onSubmit={getData}>
              <input
                type="text"
                placeholder="Search news..."
                className="bg-white text-black px-3 py-1 rounded-l-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-400 px-3 py-1 text-white rounded-r-md hover:bg-red-600 transition w-full mt-2"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

const menuItems = () => (
  <>
    <NavLink to="/" className={navLinkClasses}>Home</NavLink>
    <NavLink to="/technology" className={navLinkClasses}>Technology</NavLink>
    <NavLink to="/sports" className={navLinkClasses}>Sports</NavLink>
    <NavLink to="/politics" className={navLinkClasses}>Politics</NavLink>
    <NavLink to="/entertainment" className={navLinkClasses}>Entertainment</NavLink>
  </>
);

const navLinkClasses = ({ isActive }) =>
  `hover:text-red-400 px-3 py-2 ${isActive ? "border-b-2 border-red-400 text-red-400" : ""}`;

export default Nav;
