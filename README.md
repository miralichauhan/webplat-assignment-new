# 🚀 WebplatAssignment

This project is an **Angular 15** application built using [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

It demonstrates:

- Token-based authentication
- Protected routing with Auth Guard
- Global error handling using HTTP Interceptor
- UI styled with **Bootstrap 5**
- Toast notifications via **ngx-toastr**
- Feature pages: **Dashboard**, **Users**, **Products**
- Fully implemented **Logout** functionality

---

## 📦 Tech Stack

- **Angular 15**
- **Bootstrap 5**
- **ngx-toastr**
- **RxJS**
- **LocalStorage** (for token-based auth)

---

## 🧪 Features

### ✅ Auth & Routing
- Routes like `/profile`, `/users`, and `/products` are protected using `AuthGuard`
- Navigating to `/login` clears any existing token
- Already logged-in users visiting `/login` or `/` are redirected to `/profile`

### ✅ Token & Error Handling
- HTTP Interceptor adds `Authorization` header to all outgoing requests
- On receiving `401 Unauthorized`, user is logged out and redirected to `/login`

### ✅ UI & Notifications
- Styled using Bootstrap
- Uses ngx-toastr for showing success/error toasts

---
## 🧰 Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd WebplatAssignment
```

### 2. Install dependencies

```bash
npm install
```
