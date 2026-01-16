CREATE DATABASE IF NOT EXISTS injury_tracker;
USE injury_tracker;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE injuries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  severity INT CHECK (severity BETWEEN 1 AND 5),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- (password: 'password123' for both)
INSERT INTO users (username, password, role) VALUES 
('admin', '$2b$10$9wNDHE/rXHjBLJm/yhr9BedUkjIN580uwLP9ksEQ1Zd1i2bG0o8Hq', 'admin'),
('user', '$2b$10$9wNDHE/rXHjBLJm/yhr9BedUkjIN580uwLP9ksEQ1Zd1i2bG0o8Hq', 'user');