import "./App.css";
import Nav from "./components/Nav";
import Technology from "./components/Technology";
import Politics from "./components/Politics";
import Entertainment from "./components/Entertainment";
import Sports from "./components/Sports";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"; 
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Nav />
        <Home/>
      </div>
    ),
  },
  {
    path: "/technology",  
    element: (
      <div>
        <Nav />
        <Technology />
      </div>
    ),
  },
  {
    path: "/sports",  
    element: (
      <div>
        <Nav />
        <Sports />
      </div>
    ),
  },
  {
    path: "/entertainment",  
    element: (
      <div>
        <Nav />
        <Entertainment />
      </div>
    ),
  },
  {
    path: "/politics",  
    element: (
      <div>
        <Nav />
        <Politics />
      </div>
    ),
  },
  {
    path: "*", 
    element: <h1>404 - Page Not Found</h1>,
  },
]);

function App() {
  
  return <RouterProvider router={router} />;
}

export default App;
