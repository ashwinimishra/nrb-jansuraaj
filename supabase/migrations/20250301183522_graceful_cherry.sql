-- MySQL Database Schema for NRB Registration System

-- Create the database
CREATE DATABASE IF NOT EXISTS nrb_registration;
USE nrb_registration;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  district VARCHAR(50) NOT NULL,
  referred_by VARCHAR(36),
  profile_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Add foreign key constraint for referrals
  FOREIGN KEY (referred_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create index for faster lookups
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_referred_by ON users(referred_by);

-- Create a view to get referral statistics
CREATE OR REPLACE VIEW user_referral_stats AS
SELECT 
  u.id,
  u.full_name,
  u.email,
  COUNT(r.id) AS referral_count
FROM 
  users u
LEFT JOIN 
  users r ON u.id = r.referred_by
GROUP BY 
  u.id, u.full_name, u.email
ORDER BY 
  referral_count DESC;

-- Sample queries:

-- 1. Get all users with their referrer's name
SELECT 
  u.id, 
  u.full_name, 
  u.email, 
  u.district, 
  u.created_at,
  r.full_name AS referred_by_name
FROM 
  users u
LEFT JOIN 
  users r ON u.referred_by = r.id;

-- 2. Get top 10 referrers
SELECT 
  u.full_name, 
  u.email, 
  COUNT(r.id) AS referral_count
FROM 
  users u
LEFT JOIN 
  users r ON u.id = r.referred_by
GROUP BY 
  u.id, u.full_name, u.email
ORDER BY 
  referral_count DESC
LIMIT 10;

-- 3. Get users registered in the last 30 days
SELECT 
  * 
FROM 
  users 
WHERE 
  created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY);

-- 4. Get district-wise registration count
SELECT 
  district, 
  COUNT(*) AS registration_count
FROM 
  users
GROUP BY 
  district
ORDER BY 
  registration_count DESC;