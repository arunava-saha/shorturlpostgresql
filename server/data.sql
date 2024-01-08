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
-- Create a job that runs every 24 hours
CREATE OR REPLACE PROCEDURE delete_old_records()
BEGIN
    DELETE FROM your_table
    WHERE timestamp_column < CURRENT_TIMESTAMP - INTERVAL '48 hours';
END;

-- Schedule the job to run every 24 hours
CREATE EVENT IF NOT EXISTS delete_old_records_event
ON SCHEDULE EVERY 24 HOUR
DO CALL delete_old_records();