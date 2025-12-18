# 🎉 BookMyEvent

[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Server Setup](#server-setup)
4. [Client Setup](#client-setup)
5. [Accessing the App](#accessing-the-app)
6. [Technical Explanation](#technical-explanation)
7. [Folder Structure](#folder-structure)
8. [Screenshots](#screenshots)
9. [Acknowledgements](#acknowledgements)

---

## Project Overview
BookMyEvent is a modern web application for creating, managing, and joining events. Users can sign up, log in, create events, RSVP, cancel RSVPs, and manage their own events. It ensures accurate capacity handling and prevents multiple RSVPs for the same user on the same event.

---

## Features
- ✅ User authentication: Sign up, log in, log out
- ✅ Create, edit, and delete events (only by the creator)
- ✅ View upcoming events and joined events
- ✅ RSVP and cancel RSVP
- ✅ Event capacity management with concurrency safety
- ✅ Search events by title or filter by date
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Notifications for RSVP/cancel actions

---

## Run Locally

Clone the project

```bash
  git clone https://github.com/vikasvishwagna/BookMyEvent.git
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Create a .env file with the following:

```bash
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
```

Start the server

```bash
  npm run dev
```
Server will run on http://localhost:5000

client setup

```bash
  cd client
```

Install dependencies

```bash
  npm install
```
Start the client

```bash
  npm run dev
```
Frontend will run on http://localhost:5173






## Accessing the App

Open your browser at http://localhost:5173

Sign up for a new account or log in.

Explore the dashboard:

Create events

RSVP / Cancel RSVP

Edit/Delete your own events

Search by title and filter by date

All actions are synced with the backend, and event capacities are enforced.


## Acknowledgements

Built using React, Redux, Tailwind CSS, Node.js, Express, MongoDB.

Inspired by the A2A platform and assignment guidelines.

Thanks to all mentors and open-source contributors.

