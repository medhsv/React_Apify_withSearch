import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewsList = ({ articles }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    if (!articles.length) return <p>No articles found.</p>;

    return (
        <div className="news-container">
            <ul className="news-list">
                {articles.map((article, index) => (
                    <li key={index} className="news-item" onClick={() => handleArticleClick(article)}>
                        {article.image && (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="news-image"
                            />
                        )}
                        <div className="news-content">
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-title"
                            >
                                {article.title}
                            </a>
                            <p className="news-description">{article.source}</p>
                            {article.publishedAt && (
                                <p className="news-date">
                                    Published on: {new Date(article.publishedAt).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {selectedArticle && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedArticle.title}</h2>
                        {selectedArticle.image && (
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="modal-image"
                            />
                        )}
                        <p>{selectedArticle.source}</p>
                        <a
                            href={selectedArticle.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-more"
                        >
                            Read More
                        </a>
                        {selectedArticle.publishedAt && (
                            <p className="news-date">
                                Published on: {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Define prop types for the component
NewsList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            source: PropTypes.string,
            publishedAt: PropTypes.string,
            image: PropTypes.string,
        })
    ).isRequired,
};

export default NewsList;
