import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import Footer from "./Footer";

const API_KEY = "a605bc8a0d0b493190e82b9e4a3a60ed";

function SearchHandler() {
    const location = useLocation();
    const searchQuery = location.state?.query || "";  
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchQuery) {
            setLoading(false);
            return;
        }

        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}`
                );
                const jsonData = await response.json();

                if (jsonData.articles) {
                    setNewsData(jsonData.articles);
                } else {
                    setNewsData([]);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("Failed to fetch news. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    return (
       <>
        <Card data={newsData}/>
        <Footer/>
        </>
    );
}

export default SearchHandler;
