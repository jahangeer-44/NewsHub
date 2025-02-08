import { useEffect, useState } from "react";
// import Card from "./Card";
import Footer from "./Footer";
const API_KEY = "a605bc8a0d0b493190e82b9e4a3a60ed";

const Technology = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=Technology&apiKey=${API_KEY}`
        );
        const jsonData = await response.json();
        setNewsData(jsonData.articles || []);
        console.log(newsData);
        
      } catch (error) {
        console.error("Error fetching technology news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mt-5">Technology News</h2>
      <div className="flex justify-center flex-wrap gap-10">
        {newsData.map((curItem, index) => (
          <div
            key={index}
            className="w-80 bg-white shadow-md border border-gray-200 rounded-md mt-5"
          >
            <img
              src={curItem.urlToImage}
              alt={curItem.title}
              className="w-full h-44 object-cover rounded-t-md"
            />
            <div className="p-3">
              <a className="font-semibold text-lg">{curItem.title}</a>
              <p className="text-gray-600 text-sm mt-1">{curItem.description}</p>
              <a href={curItem.url}>
                <button className="bg-red-400 text-white text-sm px-4 py-1 rounded-md mt-3 hover:bg-red-600">
                  Read me
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
        <Footer/>
    </div>
  );
};

export default Technology;
