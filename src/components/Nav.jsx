import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Card from "./Card";
const API_KEY = "a605bc8a0d0b493190e82b9e4a3a60ed";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsData, setNewsData] = useState([]);
  const location = useLocation(); 

  const getCategory = () => {
    const path = location.pathname.replace("/", "").toLowerCase();
    return path || "general";
  };

  useEffect(() => { 
    const fetchCategoryNews = async () => {
      const category = getCategory();
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
        );
        const jsonData = await response.json();
        setNewsData(jsonData.articles);
      } catch (error) {
        console.error("Error fetching category news:", error);
      }
    };
    fetchCategoryNews();
  }, [location.pathname]);

  const getData = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      setNewsData(jsonData.articles);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
            onSubmit={() => alert("dkljfds ")}
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
                onSubmit={() => alert("dkljfds ")}
                className="bg-red-400 px-3 py-1 text-white rounded-r-md hover:bg-red-600 transition w-full mt-2"
              >
                Search 
              </button>
            </form>
          </div>
        )}
      </div>

      <div>
        
        <Card data={newsData} />
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