import React from 'react';

const NewsItem = ({ article }) => {
    return (
        <div className="news-item">
            <h2>{article.title}</h2>
            {article.image && <img src={article.image} alt={article.title} />}
            <p>{article.summary}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
    );
};

export default NewsItem;
