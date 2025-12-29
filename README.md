# 🚀 MoneyBoy – Full Stack Application

A modern, secure, and scalable web application built using **Next.js (App Router)** and **NestJS**, designed with clean architecture, secure authentication, and production-ready practices.

---

## 📌 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React 19**
* **TypeScript**
* **NextAuth** – Authentication
* **React Query** – API State Management
* **Formik + Yup** – Forms & Validation
* **Axios** – API Requests

### Backend

* **NestJS**
* **JWT / Session-based Authentication**
* **OTP Verification**
* **Secure APIs**

### Security

* **Encrypted session storage (CryptoJS)**
* **Environment-based secrets (.env)**
* **Server-side authentication**

---

## 🧱 Project Architecture

```
User → Next.js Frontend
     → NextAuth (Session Handling)
     → NestJS Backend
     → Database
```

✔ Modular Architecture
✔ Secure Authentication
✔ Scalable Backend
✔ Production Ready

---

## 📁 Folder Structure

```
app/
 ├── (auth)          → Login / Signup pages
 ├── (dashboard)     → Protected routes
 ├── api/            → API handlers
 ├── layout.tsx      → Global layout

components/          → Reusable UI components
libs/                → Auth, encryption, helpers
utils/               → API config & constants
public/              → Static assets
```

---

## 🔐 Authentication Flow

1. User logs in via frontend
2. Request sent to NestJS backend
3. Backend verifies credentials / OTP
4. Valid user data returned
5. NextAuth creates secure session
6. Encrypted session stored
7. User gets authorized access

✅ Secure
✅ Backend-driven
✅ Scalable

---

## 🛡️ Security Implementation

* NextAuth for session handling
* CryptoJS encryption for browser data
* Environment variables for secrets
* No sensitive logic on frontend
* Secure API communication

---

## 🔄 API Handling

* Axios for API requests
* React Query for:

  * Caching
  * Auto refetch
  * Error handling
  * Performance optimization

---

## ⚙️ Environment Setup

Create a `.env` file:

```env
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
API_BASE_URL=your_backend_url
```

⚠️ Do not commit `.env` to GitHub.

---

## ▶️ Run Project

```bash
npm install
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Features

* Authentication (Login / Signup)
* OTP Verification
* Encrypted session handling
* API-driven architecture
* Scalable backend
* Clean folder structure

---

## 📈 Future Enhancements

* Role-based access
* Admin dashboard
* Mobile app integration
* Analytics & logs

---

## ✅ Conclusion

This project follows modern full-stack best practices with a strong focus on:

* Security
* Scalability
* Clean code
* Maintainability

It is production-ready and easily extendable for future features.

---

### 👨‍💻 Developed By

**Sanjay**
Full Stack Developer
