# 📝 ToDo List App — Express.js • MongoDB • JWT Auth

A secure **full-stack ToDo List application** using **Express.js**, **MongoDB**, and **JWT authentication** with a frontend interface.
Users can **sign up, log in, and manage (create/read/update/delete) their personal tasks**.

---

## 🚀 Features

✨ **User Authentication (JWT)**
✔ Signup & Login
✔ JWT token stored in frontend (localStorage / cookie)
✔ Protected routes — only logged-in users can access / manipulate todos

📝 **Task Management**
✔ Add new tasks
✔ Fetch user-specific todos
✔ Edit tasks
✔ Delete tasks
✔ Secure database storage

🌐 **Frontend + Backend Integration**
✔ Frontend calls backend APIs with JWT
✔ Token included in `Authorization` header
✔ Protected REST endpoints

---

## 🛠 Technology Stack

| Layer          | Technology                         |
| -------------- | ---------------------------------- |
| Backend        | Node.js, Express.js                |
| Database       | MongoDB, Mongoose                  |
| Authentication | JWT (JSON Web Tokens)              |
| Frontend       | HTML, CSS, JS (EJS or your choice) |
| Tools          | npm, nodemon                       |

---

## 📁 Project Structure

```
Todolist-ExpressJs-MongoDB/
│
├── controller/           # Route logic
├── middleware/           # JWT auth middleware
├── model/                # Mongoose models (User, Todo)
├── routes/               # API & auth routes
├── views/                # Frontend templates (EJS or HTML)
├── service/              # Business logic & helpers
├── connection.js         # MongoDB connection
├── server.js / index.js  # App entrypoint
├── package.json
└── public/               # Static assets (optional)
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Sufiyan2302/Todolist-ExpressJs-MongoDB.git
cd Todolist-ExpressJs-MongoDB
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
```

🔒 **Keep `.env` secrets out of your repo** — add it to `.gitignore`.

---

### 4️⃣ Start the Server

**Development mode (with nodemon):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

---

## 📌 API Endpoints

### 🔐 **Authentication**

| Method | Path      | Description        |
| ------ | --------- | ------------------ |
| POST   | `/signup` | Register user      |
| POST   | `/login`  | Login & return JWT |

---

### 📝 **Todos (Protected)**

> **Include JWT in headers:**
> `Authorization: Bearer <token>`

| Method | Path            | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/api/todo`     | Get all todos for user  |
| POST   | `/api/todo`     | Create a new todo       |
| PATCH  | `/api/todo/:id` | Update an existing todo |
| DELETE | `/api/todo/:id` | Delete a todo           |

---

## 💡 Example JWT Middleware

```js
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;
```

---

## 💻 Example Todo Schema (Mongoose)

```js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);
```

---

## 🧠 How It Works

1. User signs up / logs in → receives a **JWT token**
2. Frontend stores the token safely
3. Frontend sends token with API requests
4. Backend validates JWT before allowing access
5. User performs todo operations only on their own data

---

## 🧪 Testing

Use tools like:

* **Postman**
* **Insomnia**
* **curl**

Example header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🛠 Future Enhancements

✔ Refresh Tokens
✔ Password hashing (bcrypt)
✔ Task categories / filters
✔ UI improvements with React / Vue
✔ Deploy on cloud (Heroku / Render / Vercel)

---

## 📜 License

This project is released under the **MIT License**.

---

## 👤 Author

**Sufiyan Shaikh**
GitHub: @Sufiyan2302
Project repo: [Todolist-ExpressJs-MongoDB on GitHub](https://github.com/Sufiyan2302/Todolist-ExpressJs-MongoDB.git)

