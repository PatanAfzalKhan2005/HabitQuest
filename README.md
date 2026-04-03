# Learning Quest

Full-stack learning platform with aptitude practice, coding challenges, daily words, streak tracking, rewards, and leaderboard features.

## Project Structure

```text
Learning-Quest-1/
├── frontend/
│   ├── public/
│   │   ├── icons/
│   │   ├── images/
│   │   └── screenshots/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── animations/
│   │   │   ├── charts/
│   │   │   ├── common/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── routes.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── config/         # database and passport setup
│   ├── controllers/    # request handlers
│   ├── data/           # seed/static learning data
│   ├── middleware/     # auth and error middleware
│   ├── models/         # mongoose models
│   ├── routes/         # route files + central route registry
│   ├── scripts/        # seed scripts
│   ├── utils/          # auth and scoring helpers
│   ├── app.js          # express app configuration
│   ├── package.json
│   └── server.js       # database connect + server start
└── README.md
```

## Notes

- `frontend/` is the only frontend app folder.
- `backend/` is the only backend app folder.
- Old duplicate artifact/build folders were removed to keep the repo clean.
- Backend request flow is now:
  `routes -> controllers -> models/utils`

## Run

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```
