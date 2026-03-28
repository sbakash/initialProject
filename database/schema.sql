-- Run this once to create the database and table
CREATE DATABASE IF NOT EXISTS auth_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE auth_app;

CREATE TABLE IF NOT EXISTS users (
  userid        VARCHAR(36)   NOT NULL PRIMARY KEY,
  first_name    VARCHAR(100)  NOT NULL,
  last_name     VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  phone_number  VARCHAR(20),
  password      VARCHAR(255)  NOT NULL,       -- bcrypt hash
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
