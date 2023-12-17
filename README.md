# Calendar Booking Management System

Welcome to the Calendar Booking Management System! This project allows users to manage events based on categories and available time slots. Users can log in as either a regular user or an admin. Regular users can create events, while admins have the ability to manage all bookings, edit existing bookings, and handle categories (add or delete).

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Backend API](#backend-api)
- [Technologies Used](#technologies-used)
- [Admin Access](#admin-access)
- [USER ACCESS](#user-access)

## Getting Started

These instructions will help you set up and run the Calendar Booking Management System locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yogeshsaraogi/Calendar-Booking-and-Management-Platform.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Calendar-Booking-and-Management-Platform
   ```

3. Install dependencies for the frontend and backend:

   ```bash
   # Install dependencies for the client (React)
   cd client
   npm install

   # Install dependencies for the backend (Node.js/Express)
   cd ../server
   npm install
   ```

## Running the Application

1. ClickHouse DB is already configured and running on my server.

2. Start the backend server:

   ```bash
   cd server
   nodemon index.js
   ```

3. Start the frontend application:

   ```bash
   cd ../client
   npm start
   ```

4. Access the application at [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

- **User**: Log in as a regular user to create events based on categories and available time slots.
- **Admin**: Log in as an admin to manage all bookings, edit existing bookings, and handle categories (add or delete).

## Backend API

The backend API provides the necessary CRUD operations. Ensure the backend server is running.

## Technologies Used

- **Frontend:**

  - React
  - Material-UI

- **Backend:**
  - Node.js
  - Express
  - ClickHouse DB

## ADMIN ACCESS

Username: admin
Password: admin

## USER ACCESS

You can create new credential for user access
