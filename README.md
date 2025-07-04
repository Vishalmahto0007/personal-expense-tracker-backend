# 📘 Personal-Expense-Tracker (Backend)

This is the backend of the **Personal Expense Tracker** application, built using **Node.js**, **Express**, **MongoDB**, and **JWT**. It handles user authentication and CRUD operations for expense records.

---

## 🌐 Live API

> Deployed on **Render**  
> 🔗 `https://personal-expense-tracker-backend-ljky.onrender.com`

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** for Authentication
- **bcryptjs** for Password Hashing
- **dotenv** for Env Config
- **Helmet, Morgan, Compression** for Production Middleware
- **CORS**

---

## 🛠 Features

- ✅ User Signup & Login with encrypted passwords
- 🔐 JWT Authentication for secure routes
- 💰 Expense CRUD with:
  - Pagination
  - Search
  - Category filter
- 🌍 Render deployment-friendly setup
- ⚠️ HTTPS redirect in production
- 📄 Central error handler & cleaner logs

---

## 📁 Folder Structure

├── controllers/
│ ├── auth.js # Handles user signup & login
│ └── expenseController.js # CRUD operations for expenses
├── models/
│ ├── user.js
│ └── expense.js
├── routes/
│ ├── auth.js
│ └── expenseRoutes.js
├── .env
├── .gitignore
├── package.json
├── app.js
└── README.md

---

## 🔑 API Endpoints

### 👤 Auth Routes

| Method | Route              | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Login and receive a JWT |

### 💸 Expense Routes (Require JWT)

| Method | Route               | Description                           |
| ------ | ------------------- | ------------------------------------- |
| POST   | `/api/expenses`     | Create new expense                    |
| GET    | `/api/expenses`     | Fetch expenses (search, filter, page) |
| GET    | `/api/expenses/:id` | Fetch a specific expense by ID        |
| PUT    | `/api/expenses/:id` | Update an expense                     |
| DELETE | `/api/expenses/:id` | Delete an expense                     |

> 🔐 All `/api/expenses` routes require an `Authorization: Bearer <token>` header.

---

## 👨‍💻 Author

**Vishal Mahto**
