from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

app = FastAPI(
    title="Mantra Makwana - Python API",
    description="Python FastAPI microservice for portfolio analytics & skills",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL", "")

def get_db():
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor,
                                 sslmode='require' if os.getenv("NODE_ENV") == "production" else 'prefer')
        return conn
    except Exception as e:
        print(f"[DB ERROR] {e}")
        return None


# ── Models ──────────────────────────────────────────────────────────────────
class Skill(BaseModel):
    name: str
    level: int
    category: str
    color: Optional[str] = "#00ff41"

class AnalyticsEvent(BaseModel):
    event: str
    page: str
    timestamp: Optional[str] = None


# ── Routes ───────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "service": "mantra-portfolio-python-api",
        "status": "online",
        "timestamp": datetime.utcnow().isoformat(),
        "endpoints": ["/skills", "/analytics", "/health", "/about"]
    }

@app.get("/health")
def health():
    return {"status": "healthy", "service": "python-fastapi", "uptime": "running"}

@app.get("/skills")
def get_skills():
    skills = [
        # Languages
        {"name": "Java", "level": 90, "category": "language", "color": "#f89820",
         "icon": "☕", "description": "Spring Boot, Maven, OOP, Design Patterns"},
        {"name": "Python", "level": 88, "category": "language", "color": "#3776ab",
         "icon": "🐍", "description": "FastAPI, Django, Pandas, NumPy, ML"},
        {"name": "JavaScript", "level": 92, "category": "language", "color": "#f7df1e",
         "icon": "⚡", "description": "ES6+, Async/Await, DOM, Node.js"},
        {"name": "TypeScript", "level": 78, "category": "language", "color": "#3178c6",
         "icon": "📘", "description": "Interfaces, Generics, Decorators"},
        {"name": "SQL", "level": 85, "category": "language", "color": "#336791",
         "icon": "🗄️", "description": "PostgreSQL, MySQL, Query Optimization"},
        {"name": "Bash", "level": 72, "category": "language", "color": "#4eaa25",
         "icon": "💻", "description": "Shell scripting, Automation, Linux"},

        # Frameworks
        {"name": "React", "level": 90, "category": "framework", "color": "#61dafb",
         "icon": "⚛️", "description": "Hooks, Context, Redux, Three.js"},
        {"name": "Node.js", "level": 88, "category": "framework", "color": "#339933",
         "icon": "🟢", "description": "Express, REST APIs, WebSockets"},
        {"name": "Spring Boot", "level": 82, "category": "framework", "color": "#6db33f",
         "icon": "🍃", "description": "REST, JPA, Security, Microservices"},
        {"name": "FastAPI", "level": 85, "category": "framework", "color": "#009688",
         "icon": "🚀", "description": "Async, Pydantic, OpenAPI, JWT"},

        # Databases
        {"name": "PostgreSQL", "level": 85, "category": "database", "color": "#336791",
         "icon": "🐘", "description": "Indexing, Transactions, JSONB"},
        {"name": "MongoDB", "level": 80, "category": "database", "color": "#47a248",
         "icon": "🍃", "description": "Aggregation, Atlas, Mongoose"},

        # DevOps
        {"name": "Docker", "level": 75, "category": "devops", "color": "#2496ed",
         "icon": "🐳", "description": "Containers, Compose, Networking"},
        {"name": "Git", "level": 90, "category": "devops", "color": "#f05032",
         "icon": "📦", "description": "Branching, CI/CD, GitHub Actions"},
        {"name": "Linux", "level": 80, "category": "devops", "color": "#fcc624",
         "icon": "🐧", "description": "Ubuntu, Debian, System Admin"},
    ]
    return {"success": True, "count": len(skills), "data": skills}

@app.get("/about")
def get_about():
    return {
        "success": True,
        "data": {
            "name": "Mantra Makwana",
            "role": "Full-Stack Developer & IT Specialist",
            "tagline": "Building systems that don't just work — they dominate.",
            "bio": (
                "I'm Mantra Makwana, a passionate full-stack developer and IT specialist "
                "who lives at the intersection of elegant code and raw performance. "
                "I build end-to-end systems using Java, Python, and the MERN stack — "
                "from microservices to 3D web experiences. When I'm not coding, "
                "I'm reverse-engineering how things work."
            ),
            "location": "India",
            "available": True,
            "specializations": [
                "Full-Stack Web Development (MERN)",
                "Java Backend & Spring Boot",
                "Python Automation & APIs",
                "PostgreSQL Database Design",
                "IT Infrastructure & DevOps",
                "System Architecture"
            ],
            "education": {
                "degree": "B.Tech / BCA in Computer Science",
                "focus": "Software Engineering & IT Systems"
            }
        }
    }

@app.post("/analytics")
def track_event(event: AnalyticsEvent):
    print(f"[ANALYTICS] {event.event} on {event.page} at {event.timestamp or datetime.utcnow().isoformat()}")
    return {"success": True, "message": "Event tracked"}

@app.get("/terminal-facts")
def terminal_facts():
    facts = [
        "print('Hello, World!') — first line ever written",
        "public static void main(String[] args) — Java roots run deep",
        "SELECT * FROM skills WHERE level > 80; — 12 rows returned",
        "git commit -m 'fix: another bug squashed at 3am'",
        "docker ps — 4 containers running, 0 issues",
        "sudo apt-get install coffee — package not found, brewing manually",
        "while(alive) { eat(); sleep(); code(); }",
        "// TODO: sleep more — added 847 days ago, still pending",
    ]
    return {"success": True, "data": facts}