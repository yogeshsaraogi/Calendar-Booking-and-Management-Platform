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
- [ClickHouse DB](https://clickhouse.tech/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yogeshsaraogi/Calendar-Booking-and-Management-Platform.git
   ```

2. Navigate to the project directory:

   ```bash
   cd calendar-booking-management
   ```

3. Install dependencies for the frontend and backend:

   ```bash
   # Install dependencies for the client (React)
   cd client
   npm install

   # Install dependencies for the backend (Node.js/Express)
   cd ../backend
   npm install
   ```

## Running the Application

1. Start the ClickHouse DB. Ensure it's configured and running.

2. Start the backend server:

   ```bash
   cd backend
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

The backend API provides the necessary CRUD operations. Ensure the backend server is running, and you can access the API documentation at [http://localhost:3001/api-docs](http://localhost:3001/api-docs).

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
