# 🖥️ Mantra Makwana — Portfolio

> **Full-Stack Developer Portfolio** | Java · Python · MERN · PostgreSQL · Docker

A hacker-dark themed, fully animated portfolio website with a multi-backend architecture — Node.js, Python FastAPI, and Java Spring Boot — all connected to PostgreSQL and deployable via Docker or Render.com.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Nginx (Port 80)                       │
│              Reverse Proxy / Load Balancer               │
└──────┬──────────────┬──────────────┬────────────────────┘
       │              │              │
       ▼              ▼              ▼
  ┌─────────┐   ┌──────────┐   ┌──────────┐
  │  React  │   │ Node.js  │   │  Python  │
  │Frontend │   │ Express  │   │ FastAPI  │
  │ :3000   │   │  :5000   │   │  :8000   │
  └─────────┘   └────┬─────┘   └────┬─────┘
                     │              │
              ┌──────────┐          │
              │  Java    │          │
              │  Spring  │          │
              │  :8080   │          │
              └────┬─────┘          │
                   │                │
                   ▼                ▼
            ┌──────────────────────────┐
            │      PostgreSQL :5432    │
            │       portfolio_db       │
            └──────────────────────────┘
```

---

## 📁 Project Structure

```
portfolio-mantra/
├── frontend/               # React app (hacker dark theme)
│   ├── src/
│   │   ├── components/     # Navbar, Hero, About, Skills, Projects, Contact, Footer
│   │   ├── App.js
│   │   └── index.css       # Global hacker theme + animations
│   ├── Dockerfile
│   └── package.json
│
├── backend-node/           # Node.js / Express REST API
│   ├── src/
│   │   ├── routes/         # projects.js, contact.js, stats.js
│   │   └── server.js
│   ├── config/database.js
│   ├── Dockerfile
│   └── package.json
│
├── backend-python/         # Python FastAPI microservice
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── backend-java/           # Java Spring Boot service
│   ├── src/main/java/com/mantra/portfolio/
│   │   ├── PortfolioApplication.java
│   │   └── controller/PortfolioController.java
│   ├── pom.xml
│   └── Dockerfile
│
├── database/
│   └── schema.sql          # PostgreSQL schema + seed data
│
├── nginx/
│   └── nginx.conf          # Reverse proxy config
│
├── docker-compose.yml      # Full local stack
├── render.yaml             # Render.com deployment
└── README.md
```

---

## 🚀 Quick Start — Docker (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- Git

### 1. Clone & Run

```bash
git clone https://github.com/mantramakwana/portfolio.git
cd portfolio-mantra

# Start all services
docker compose up --build

# Or run in background
docker compose up --build -d
```

### 2. Access the App

| Service         | URL                          |
|-----------------|------------------------------|
| Portfolio       | http://localhost:80           |
| React Dev       | http://localhost:3000         |
| Node.js API     | http://localhost:5000/api     |
| Python API      | http://localhost:8000/docs    |
| Java API        | http://localhost:8080/api     |
| PostgreSQL      | localhost:5432                |

### 3. Stop Services

```bash
docker compose down

# Remove volumes too
docker compose down -v
```

---

## 💻 Local Development (Without Docker)

### Prerequisites
- Node.js 18+
- Python 3.11+
- Java 17+ & Maven 3.9+
- PostgreSQL 15+

### 1. Database Setup

```bash
# Create database
psql -U postgres
CREATE DATABASE portfolio_db;
CREATE USER mantra WITH PASSWORD 'mantra_secret';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO mantra;
\q

# Run schema
psql -U mantra -d portfolio_db -f database/schema.sql
```

### 2. Node.js Backend

```bash
cd backend-node
cp .env.example .env
# Edit .env with your DATABASE_URL

npm install
npm run dev
# Runs on http://localhost:5000
```

### 3. Python Backend

```bash
cd backend-python
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Runs on http://localhost:8000
# Swagger docs: http://localhost:8000/docs
```

### 4. Java Backend

```bash
cd backend-java

# Set environment variables
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/portfolio_db
export SPRING_DATASOURCE_USERNAME=mantra
export SPRING_DATASOURCE_PASSWORD=mantra_secret

mvn spring-boot:run
# Runs on http://localhost:8080
```

### 5. React Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm start
# Runs on http://localhost:3000
```

---

## ☁️ Deploy to Render.com (Free Tier)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2 — Create Render Account
Go to [render.com](https://render.com) and sign up with GitHub.

### Step 3 — Deploy via Blueprint (render.yaml)

1. In Render dashboard → **New** → **Blueprint**
2. Connect your GitHub repository
3. Render auto-detects `render.yaml` and creates all services:
   - `mantra-portfolio` (Static Site — React)
   - `mantra-node-api` (Web Service — Node.js)
   - `mantra-python-api` (Web Service — Python)
   - `mantra-java-api` (Web Service — Docker/Java)
   - `portfolio-postgres` (PostgreSQL Database)

### Step 4 — Configure Environment Variables

After deployment, update these in each service's Render dashboard:

**mantra-node-api:**
```
NODE_ENV=production
CORS_ORIGIN=https://mantra-portfolio.onrender.com
```

**mantra-python-api:**
```
CORS_ORIGINS=["https://mantra-portfolio.onrender.com"]
```

**mantra-portfolio (Static Site):**
Update the API rewrite rules to point to your actual Render service URLs.

### Step 5 — Run Database Schema

In Render dashboard → `portfolio-postgres` → **Shell**:
```sql
\i schema.sql
```
Or connect via psql using the External Database URL from Render.

### ⚠️ Free Tier Notes
- Services **spin down** after 15 minutes of inactivity (cold start ~30s)
- PostgreSQL free tier expires after **90 days** — upgrade or recreate
- Java service requires Docker runtime (uses more memory — may need Starter plan)

---

## 🔧 API Endpoints

### Node.js API (`/api`)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/health`         | Health check             |
| GET    | `/api/projects`       | Get all projects         |
| GET    | `/api/projects/:id`   | Get project by ID        |
| POST   | `/api/contact`        | Submit contact form      |
| GET    | `/api/stats`          | Portfolio statistics     |

### Python FastAPI (`/py` or `:8000`)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/health`             | Health check             |
| GET    | `/skills`             | Get skills data          |
| GET    | `/experience`         | Get experience data      |
| GET    | `/stats`              | Aggregated stats         |
| GET    | `/docs`               | Swagger UI               |

### Java Spring Boot (`/java` or `:8080`)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/health`         | Health check             |
| GET    | `/api/portfolio`      | Portfolio summary         |
| GET    | `/api/technologies`   | Tech stack list          |

---

## 🎨 Frontend Features

- **Hacker Dark Theme** — Deep green-on-black with neon accents
- **Matrix Rain** — Animated canvas background on hero
- **3D Rotating Cube** — CSS 3D transform with tech stack faces
- **Terminal Typewriter** — Animated terminal intro sequence
- **Glitch Effect** — CSS glitch animation on hero name
- **Scanline Overlay** — CRT monitor aesthetic
- **Custom Cursor** — Neon green dot + ring cursor
- **Boot Screen** — Loading animation on first visit
- **Skill Bars** — Intersection Observer animated progress bars
- **Project Filter** — Category-based project filtering
- **Contact Form** — Connected to Node.js API
- **Fully Responsive** — Mobile-first design

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | React 18, CSS3, Canvas API              |
| Backend 1   | Node.js 18, Express 4, JWT              |
| Backend 2   | Python 3.11, FastAPI, SQLAlchemy        |
| Backend 3   | Java 17, Spring Boot 3, JPA             |
| Database    | PostgreSQL 15                           |
| DevOps      | Docker, Docker Compose, Nginx           |
| Deployment  | Render.com                              |

---

## 📝 Customization

### Update Personal Info
Edit these files with your actual details:

- `frontend/src/components/Hero.js` — Name, role, stats
- `frontend/src/components/About.js` — Bio text
- `frontend/src/components/Skills.js` — Skill levels
- `frontend/src/components/Projects.js` — Project data
- `frontend/src/components/Contact.js` — Social links, email
- `frontend/src/components/Footer.js` — Footer links

### Change Theme Colors
Edit `frontend/src/index.css` CSS variables:
```css
:root {
  --green: #00ff41;      /* Primary neon color */
  --bg:    #020c02;      /* Background */
  /* ... */
}
```

---

## 📄 License

MIT License — feel free to use this as a template for your own portfolio.

---

*Built with ☕ Java, 🐍 Python, ⚛️ React, and 🐳 Docker*