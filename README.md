# Auth App — React + Node.js + MySQL + Firebase

## Project structure

```
hello-world-react/
├── frontend/          # React (Vite) web app
├── backend/           # Node.js / Express REST API
├── database/
│   └── schema.sql     # MySQL table definition
├── firebase.json      # Firebase Hosting config
└── .firebaserc        # Firebase project alias
```

---

## 1. MySQL setup

```bash
mysql -u root -p < database/schema.sql
```

Or run the SQL manually in MySQL Workbench / phpMyAdmin.

---

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env        # then edit .env with your DB credentials
npm run dev                 # starts on http://localhost:5000
```

**`.env` values:**

| Key | Description |
|-----|-------------|
| `DB_HOST` | MySQL host (default: `localhost`) |
| `DB_PORT` | MySQL port (default: `3306`) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name (`auth_app`) |
| `JWT_SECRET` | Secret key for JWT signing — change this! |
| `PORT` | API port (default: `5000`) |

---

## 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env        # set VITE_API_URL to your backend URL
npm run dev                 # starts on http://localhost:5173
```

---

## 4. Deploy frontend to Firebase Hosting

### Prerequisites

```bash
npm install -g firebase-tools
firebase login
```

### One-time project init (skip if already done)

```bash
firebase use --add          # pick your Firebase project
```
Or edit `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID`.

### Deploy

```bash
cd frontend
# Set the production backend URL
echo "VITE_API_URL=https://your-backend-url.com" > .env.production

npm run build               # outputs to frontend/dist/
cd ..
firebase deploy --only hosting
```

Firebase will print a live URL like `https://your-project.web.app`.

---

## 5. Backend hosting options

The Express API needs a server (Firebase Hosting is static-only). Options:

| Option | Notes |
|--------|-------|
| **Railway** | Easy, supports MySQL add-on |
| **Render** | Free tier available |
| **Google Cloud Run** | Pairs well with Firebase |
| **Any VPS** | Run with `npm start` behind nginx |

After deploying the backend, update `VITE_API_URL` in your frontend `.env.production` and redeploy.

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/register` | Register new user |
| `POST` | `/api/login` | Login |
| `GET`  | `/api/health` | Health check |

### Register payload

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone_number": "+1234567890",
  "password": "secret123"
}
```

### Login payload

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```
