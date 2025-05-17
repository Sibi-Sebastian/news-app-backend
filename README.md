## News Application Backend API

## Project Features

## The backend includes the following main modules:

## 1. User Module
- User Registration (email, mobile, password)
- User Login with JWT Authentication
- View & Update Profile
- Like a News Post
- Comment on News Post
- View News List (with filter by category, search, and pagination)
- View News Details

## 2. Admin Module
- Admin Login with JWT Authentication
- Manage News Categories (Add, View, Update, Delete)
- Manage News Posts (Add, View, Update, Delete)
- Upload Images to Cloudinary
- View All Comments
- View All Users

## 3. News Module
- Add News (admin only)
- List News with Search, Filter, Pagination
- View Single News Post
- Update/Delete News (admin only)

## 4. Like & Comment Module
- Like a News Post (user)
- Add Comment to News (user)
- View Comments on News


## What I Learned

## During this project, I worked on and learned:

- Structuring a Node.js backend using MVC and service-based architecture
- Using **JWT** for secure authentication
- Implementing **role-based access control** (separating users and admins)
- Working with **MongoDB**: relationships, population, filtering, and pagination
- Uploading and managing images using **Multer** and **Cloudinary**
- Writing clean, reusable, and modular code
- Handling errors and sending proper API responses
- Managing environment variables with **dotenv**
- Creating a scalable and maintainable folder structure


## Folder Structure Overview

news-app-backend/
│
├── controllers/ # Route handlers (logic for API endpoints)
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── services/ # Business logic
├── middlewares/ # Auth, error handling, etc.
├── utils/ # Helper functions (e.g., Cloudinary upload)
├── config/ # DB config, cloudinary config
├── .env # Environment variables
├── app.js # Entry point for express app
└── README.md # Project info
