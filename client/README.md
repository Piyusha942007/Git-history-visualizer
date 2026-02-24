# 🚀 Backend Server Setup

## 📌 Overview

This is the backend server for the project. It is built using:

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## ⚙️ Installation

Clone the repo:

```
git clone <repo-url>
cd server
```

Install dependencies:

```
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## ▶ Running Server

```
node server.js
```

You should see:

```
MongoDB Connected
Server running on port 5000
```

---

## 🌐 API Endpoints

| Method | Route      | Description              |
| ------ | ---------- | ------------------------ |
| GET    | `/`        | Server health check      |
| GET    | `/test-db` | Database connection test |

---

## 🧪 Testing

Open browser:

```
http://localhost:5000/
```

```
http://localhost:5000/test-db
```

---

## 📁 Folder Structure

```
server
│── routes
│── models
│── .env
│── server.js
```

---

## 👥 Team Notes

* Do not commit `.env`
* Add routes inside `/routes`
* Keep server.js clean

---

## ✅ Status

Backend setup complete and ready for integration.
