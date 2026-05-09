# Traffic Alert System

![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi) ![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react) ![Status](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-yellow)

> Tired of checking Google Maps every morning? This app tracks your routes, detects delays automatically, and notifies you before you even leave the house.

**Live Demo:** [traffic-sms-notifier.vercel.app](https://traffic-sms-notifier.vercel.app) | **Video Walkthrough:** coming soon

---

## Table of Contents

- [Traffic Alert System](#traffic-alert-system)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [Clone the repository](#clone-the-repository)
      - [Backend Setup (FastAPI)](#backend-setup-fastapi)
      - [Environment Variables](#environment-variables)
      - [Database Setup](#database-setup)
      - [Run Backend Server](#run-backend-server)
      - [Frontend Setup (React)](#frontend-setup-react)
      - [Environment Variables - Frontend](#environment-variables---frontend)
  - [Screenshots](#screenshots)
  - [Architecture](#architecture)
  - [License](#license)
  - [Contact](#contact)

---

## About

Most people manually check Google Maps before their commute to avoid delays. This app eliminates that routine by letting users save routes, schedule traffic checks, and receive automated notifications when delays are detected. It also stores traffic history, enabling users to identify patterns and plan their commutes more effectively.

## Features

- Save custom routes with scheduled check times  
- Automatic background traffic checks via APScheduler
- Real-time alerts via in-app notifications and SMS when delays are detected
- Traffic history dashboard with visualizations to analyse patterns over time
- Analytics dashboard with statistical metrics - mean, median, standard deviation, and on-time rate calculated from historical traffic data
- Domain-specific performance scoring based on custom delay thresholds (Light ≤5 min, Medium ≤15 min, Heavy >15 min)
- Secure user accounts with JWT authentication

## Tech Stack

| Layer          | Technology                                   |
|----------------|----------------------------------------------|
| Frontend       | React, JavaScript, Tailwind CSS, Recharts                       |
| Backend        | FastAPI, Python, REST API                    |
| Database       | SQLite (dev), PostgreSQL (Render), SQLModel, Alembic |
| Authentication | JWT Authentication                           |
| External APIs  | Google Maps API, Twilio API                  |
| Scheduler      | APScheduler                                  |
| Hosting        | Vercel (Frontend), Render (Backend + DB)     |

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- uv (Python package manager)
- PostgreSQL (for production database)

### Installation

#### Clone the repository

```bash
git clone https://github.com/alexgantony/traffic_sms_notifier.git
```

#### Backend Setup (FastAPI)

```bash
cd backend

# Install dependencies (uses pyproject.toml)
uv sync
```

#### Environment Variables

Create a `.env` file in the `backend` root:

```bash
# Security
SECRET_KEY=your_secret_key_here

# Google APIs
GOOGLE_BACKEND_API_KEY=your_backend_key_here
GOOGLE_FRONTEND_API_KEY=your_frontend_key_here

# Twilio SMS Service
SMS_ENABLED=False
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_number_here

# Database
DATABASE_URL=postgresql://user:password@localhost/db_name
```

#### Database Setup

Run migrations:

```bash
alembic upgrade head
```

#### Run Backend Server

```bash
uvicorn main:app --reload
```

Backend will run on: [http://localhost:8000](http://localhost:8000)

#### Frontend Setup (React)

```bash
cd frontend

npm install
npm run dev
```

#### Environment Variables - Frontend

Create a `.env` file in the `frontend` root:

```bash
VITE_API_URL=https://your-backend-url.onrender.com
```

Frontend will run on: [http://localhost:5173](http://localhost:5173)

## Screenshots

| Login | Home |
|---|---|
| ![Login](./docs/screenshots/login_page.jpg) | ![Home](./docs/screenshots/home_page.jpg) |

| Add Route | Settings |
|---|---|
| ![Add Route](./docs/screenshots/add_route.jpg) | ![Settings](./docs/screenshots/settings_page.jpg)  |

| Analytics |
|---|
| ![Analytics](./docs/screenshots/analytics_page.png) |

## Architecture

![Architecture](./docs/architecture.png)

## License

Distributed under the MIT License. See [LICENSE](backend/LICENSE) for more information.

## Contact

[![Email](https://img.shields.io/badge/Email-aleximu03@gmail.com-D44638?logo=gmail)](mailto:aleximu03@gmail.com) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/alexgantony/) [![GitHub](https://img.shields.io/badge/GitHub-Follow-black?logo=github)](https://github.com/alexgantony)
