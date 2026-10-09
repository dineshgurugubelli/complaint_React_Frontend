# Complaint Management System
https://complaint-react-frontend.vercel.app/

A React single-page application to raise, track and resolve complaints. It uses
JSON Server as a simple REST API and was built following the 6-day course
documentation (Router → CRUD → Auth → Redux → Search/Filter/Sort → Deployment).

## Features

- **Home** page with quick links
- **Complaints** list with cards (image, category, status, priority)
- **Complaint details** page (description, location, date, complainant, assigned team, resolution notes)
- **File / Edit / Delete** complaints (POST, PUT, DELETE) with form validation
- **Signup, Login, Logout** using JSON Server and `localStorage`
- **Protected routes** – filing and editing a complaint require login
- **Important complaints** with Redux Toolkit (add, remove, duplicate-safe, saved in `localStorage`, count in navbar)
- **Search** by title, **filter** by category and status, **sort** by priority
- Loading, empty and error states; responsive layout (desktop, tablet, mobile)
- Netlify-ready (`public/_redirects`) so refreshing `/complaints` etc. does not 404

## Technologies Used

React 19, Vite, React Router, Axios, Redux Toolkit + React Redux, JSON Server (0.17.4), plain CSS.

## Folder Structure

```text
Complaint-Management-System/
├── public/
│   └── _redirects            # Netlify SPA fix
├── src/
│   ├── app/store.js          # Redux store (+ localStorage persistence)
│   ├── features/importantSlice.js
│   ├── components/           # Navbar, ComplaintCard, ComplaintForm, Badge, ComplaintImage
│   ├── context/AuthContext.jsx
│   ├── pages/                # Home, Complaints, ComplaintDetails, AddComplaint,
│   │                         # EditComplaint, Important, Signup, Login, Logout, NotFound
│   ├── routes/               # AppRoutes.jsx, ProtectedRoute.jsx
│   ├── services/api.js       # Axios instance
│   ├── utils/                # constants and image fallback helper
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json                   # JSON Server data (users + complaints)
├── index.html
├── package.json
├── vite.config.js
└── .env.example
```

## Installation

```bash
npm install
```

## How to Run

You need **two terminals**.

**Terminal 1 – API (JSON Server on port 3000):**

```bash
npm run server
```

**Terminal 2 – React app:**

```bash
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

Demo login: `admin@gmail.com` / `admin123`

## How to Build

```bash
npm run build      # creates the dist/ folder
npm run preview    # optional: preview the production build
```

## API Configuration

The API URL lives in one place: `src/services/api.js`. It reads `VITE_API_URL`
and falls back to `http://localhost:3000`.

To use a deployed API (for example Render), create a `.env` file:

```text
VITE_API_URL=https://complaint-management-api.onrender.com
```

Endpoints used: `GET/POST /complaints`, `GET/PUT/DELETE /complaints/:id`, `GET/POST /users`.

## Deployment (Day 6)

1. **Backend (Render):** put `db.json` and a `package.json` that has `json-server@0.17.4`
   in a separate repo, with the start script
   `json-server --watch db.json --host 0.0.0.0 --port $PORT`. Create a Render Web Service
   (build: `npm install`, start: `npm start`).
2. **Frontend (Netlify):** set `VITE_API_URL` to the Render URL, build command
   `npm run build`, publish directory `dist`.

## Important Notes

- JSON Server stores passwords in plain text. This is fine for learning, **not** for production.
- Complaints without a valid image URL show an automatically generated category picture.
- Render's free tier sleeps when idle, so the first request may take a few seconds.
- Deleting a complaint also removes it from the Important list.
