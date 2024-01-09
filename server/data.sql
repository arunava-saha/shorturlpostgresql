CREATE DATABASE shortUrl

CREATE TABLE urls (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    original_url VARCHAR(65535),
    code VARCHAR(16),
    clicks INT,    
    date VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255) 
);
