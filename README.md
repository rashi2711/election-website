# 🗳 Election Website System (MERN Stack)

## 📚 Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Motivation](#motivation)
5. [System Architecture](#system-architecture)
6. [Workflow](#workflow)
7. [Security & Integrity](#security--integrity)
8. [Database Schema](#database-schema)
9. [Setup Instructions](#setup-instructions)
10. [API Endpoints](#api-endpoints)
11. [Example Usage](#example-usage)
12. [Future Enhancements](#future-enhancements)
13. [Contributing](#contributing)
14. [License](#license)

---

## 🗳 Introduction
The *Election Website System* is a *secure, efficient, and scalable* web platform designed to *digitally manage student elections*.

Built using the *MERN stack (MongoDB, Express.js, React, Node.js)*, it features:
- *Dynamic candidature form submissions*
- *Admin approval and rejection workflows*
- *Passkey + OTP authentication*
- *Dynamic, eligibility-based ballot generation*
- *Real-time voting analytics*

This system ensures *privacy, security, and scalability* for a smooth and transparent election process.

---

## ✅ Features

### 🎯 *Admin Portal*
- *Secure Authentication:* JWT-based login system for admin access.
- *Candidate Management:*  
    - Review, approve, or reject candidate applications.  
    - Verify candidates against the student database.  
- *Real-time Voting Analytics:*  
    - Display total votes, candidate rankings, and voting trends.  
- *Audit Logs:*  
    - Logs all admin actions for transparency.  
- *Dynamic Position Management:* (Bonus feature)  
    - Create new positions dynamically with custom eligibility filters.  

### 🗳 *Voter Portal*
- *Candidature Form:*  
    - Candidates submit applications through the landing page.  
    - Automatic validation against the student database.  
- *Authentication with OTP:*  
    - Two-step authentication (Passkey + OTP) for voter security.  
- *Dynamic Ballot Generation:*  
    - Voters only see the positions they are eligible to vote for.  
- *Anonymous Voting:*  
    - Votes are stored without linking them to the voter ID.  

---

## ⚙ Tech Stack

### 🛠 *Frontend*
- *React.js* → Dynamic and responsive UI.  

### 🔥 *Backend*
- *Node.js + Express.js* → RESTful API handling business logic.  

### 💾 *Database*
- *MongoDB* → NoSQL database for efficient data storage.  

### 🚀 *Key Libraries & Tools*
- bcrypt: Password hashing for admin security.  
- jsonwebtoken: JWT-based authentication.  
- nodemailer: Email delivery for OTPs and passkeys.  
- crypto: Random passkey generation.  
- csv-parser: CSV parsing for admin upload (if used).  

---

## 🎯 Motivation

This project was created to:
- *Digitally streamline student elections* with a transparent and secure process.  
- *Enhance fairness* by automating candidate verification and eligibility checks.  
- *Eliminate manual errors* with automated vote counting.  
- *Maintain privacy* through anonymous vote storage and encryption.  

---

## 🛠 System Architecture

```mermaid
graph LR
    A[Candidate] -->|Fills Form| B[Backend]
    B -->|Validates & Approves| C[Admin Portal]
    C -->|Generates Passkey| D[MongoDB]
    D -->|Emails Passkey| E[Voter]
    
    E -->|Authenticates with Passkey + OTP| F[Dynamic Ballot]
    F -->|Casts Vote| G[Vote Storage (Anonymous)]
    G -->|Real-time Tracking| H[Admin Dashboard]
