# BuildForge Frontend

BuildForge is a React frontend for tracking car builds, parts, costs, and build progress.

The app allows users to sign up, sign in, create vehicle builds, add items or parts to those builds, and track budget progress using simple dashboard views and build statistics.

This repository contains the frontend only. It connects to a separate backend API for authentication, builds, and item data.

---

## Features

- User sign up and sign in
- JWT-based authentication
- Protected dashboard routes
- Create, view, edit, and delete builds
- Add, edit, and delete build items
- Track item category, status, cost, and notes
- View budget and item statistics for each build
- Recharts-based build stats display
- Simple custom CSS styling
- Responsive layout for smaller screens

---

## Tech Stack

- React
- Vite
- React Router
- Axios
- Recharts
- CSS

---

## Project Structure

```txt
BuildForge-Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── buildStats.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Homepage.jsx
│   │   ├── SignIn.jsx
│   │   ├── Signup.jsx
│   │   ├── buildDetails.jsx
│   │   ├── createBuild.jsx
│   │   ├── createItem.jsx
│   │   ├── editBuild.jsx
│   │   └── editItem.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd BuildForge-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create an environment file
```

Then update the backend URL if needed:

```env
VITE_BACKEND_URL= XXXXXX
```

### 4. Run the development server

```bash
npm run dev
```

The app will usually run at:

```txt
http://localhost:5173
```

---

## Available Scripts

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

---

## Frontend Routes

| Route | Page | Description |
|---|---|---|
| `/` | Homepage | Landing page |
| `/sign-up` | Signup | Create a new account |
| `/sign-in` | SignIn | Log in to an account |
| `/dashboard` | Dashboard | View all builds for the logged-in user |
| `/builds/create` | Create Build | Create a new build |
| `/builds/:id` | Build Details | View one build and its items |
| `/builds/:id/edit` | Edit Build | Edit an existing build |
| `/builds/:buildId/items/create` | Create Item | Add an item to a build |
| `/items/:id/edit` | Edit Item | Edit an existing item |

---

## Backend API Used

This frontend expects a backend API with the following routes:

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/auth/sign-up` | Register a new user |
| `POST` | `/auth/sign-in` | Sign in and receive a token |
| `GET` | `/build` | Get all builds for the logged-in user |
| `POST` | `/build` | Create a new build |
| `GET` | `/build/:id` | Get one build |
| `PUT` | `/build/:id` | Update a build |
| `DELETE` | `/build/:id` | Delete a build |
| `GET` | `/item` | Get all items |
| `POST` | `/item` | Create a new item |
| `GET` | `/item/:id` | Get one item |
| `PUT` | `/item/:id` | Update an item |
| `DELETE` | `/item/:id` | Delete an item |

Protected routes should receive an authorization header:

```js
Authorization: Bearer token_here
```

---

## Main Pages

### Homepage

A simple landing page that introduces the app and links users to sign in or sign up.

### Sign Up / Sign In

Allows users to create an account and log in. After login, the token is saved in local storage and used for authenticated requests.

### Dashboard

Shows all builds created by the logged-in user.

### Build Details

Displays one build with its information, item list, and build statistics.

### Create / Edit Build

Forms used to create or update a vehicle build.

### Create / Edit Item

Forms used to add or update items inside a build.

---

## Styling

The app uses simple custom CSS in:

```txt
src/index.css
```

The styling is intentionally kept readable and beginner-friendly, using regular class names such as:

- `navbar`
- `form-page`
- `form-input`
- `dashboard-page`
- `build-card`
- `item-card`
- `action-link`
- `danger-btn`

---

## Environment Variables

This project uses the following environment variable:

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | The base URL of the backend API |

Example:

```env
VITE_BACKEND_URL=XXXXXX
```
---

