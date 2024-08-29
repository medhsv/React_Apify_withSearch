import React, { useState } from 'react';
import NewsList from './NewsList';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (query.trim() === '') {
            alert('Please enter a search term');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/news?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            setArticles(data);
            setError('');
        } catch (error) {
            console.error('Error fetching news:', error);
            setError(`Failed to fetch news: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <h1>News Search</h1>
            <input
                type="text"
                placeholder="Search for news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error">{error}</p>}
            <NewsList articles={articles} />
        </div>
    );
}

export default App;
