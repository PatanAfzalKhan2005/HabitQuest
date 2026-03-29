# Gain Discipline

Full-stack gamified learning platform with aptitude practice, coding challenges, streak tracking, rewards, and leaderboard features.

## Project Structure

```text
gain-discipline/
├── frontend/                  # React + Vite frontend
│   ├── public/
│   │   └── images/
│   │       ├── hero-bg.png
│   │       ├── mascot.png
│   │       └── icons/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── aptitude/
│   │   │   ├── coding/
│   │   │   ├── dashboard/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── backend/                   # Node + Express + MongoDB backend
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── data/
│   ├── scripts/
│   ├── .env
│   ├── server.js
│   └── package.json
├── artifacts/                 # Original Replit source snapshots
├── attached_assets/
└── README.md
```

## Notes

- The migrated app now uses `frontend/` and `backend/` as the main MERN folders.
- The frontend is still in TypeScript/TSX to avoid changing UI behavior during migration.
- The backend uses Express, Mongoose, and JWT-oriented auth flow.

## Run

Backend:

```bash
cd backend
npm install
npm run seed
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```
