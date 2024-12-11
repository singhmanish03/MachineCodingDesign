import React, { useState } from 'react';
import axios from 'axios';

// Fetch the base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Home = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleShorten = async () => {
        if (!originalUrl) {
            alert("Please enter a valid URL");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/shorten`, { originalUrl });
            console.log(response.data);
            setShortUrl(response.data.shortUrl);
        } catch (err) {
            setError("Error shortening URL. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
            alert("Short URL copied to clipboard!");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>URL SHORTEN</h1>

            <input
                type="text"
                value={originalUrl}
                placeholder="Write the URL here..."
                onChange={(e) => setOriginalUrl(e.target.value)}
                style={{ padding: "10px", width: "300px" }}
            />
            
            <button
                onClick={handleShorten}
                style={{
                    marginLeft: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {loading ? "Shortening..." : "Shorten"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {shortUrl && (
                <div>
                    <p>Shortened URL: <a href={`/${shortUrl}`} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                    <button onClick={handleCopy} style={{ marginTop: "10px" }}>
                        Copy URL
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
