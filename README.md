# GlobeTrotter - Global Travel Planning Platform

GlobeTrotter is a production-grade travel planning application built with Next.js 14, Node.js, Prisma, and Google Maps API.

## Features
- **Smart Itinerary Builder**: Drag-and-drop day-wise planning.
- **Interactive Maps**: Real-time visualization of routes and stops.
- **Budget Analytics**: Detailed expense tracking and cost estimation.
- **Auth System**: Secure JWT-based authentication with refresh tokens.
- **Admin Panel**: Analytics and user activity monitoring.
- **Responsive Design**: Premium, dark-themed UI with glassmorphism.

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Chart.js
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL
- **Maps**: Google Maps JavaScript API

## Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Google Maps API Key

### Installation

1. Clone the repository.
2. Set up environment variables:
   - Copy `server/.env.example` to `server/.env` and fill in the values.
   - Copy `client/.env.example` to `client/.env` and fill in the values.

3. Run with Docker:
   ```bash
   docker-compose up --build
   ```

4. Or run locally:
   - **Backend**:
     ```bash
     cd server
     npm install
     npx prisma generate
     npm run dev
     ```
   - **Frontend**:
     ```bash
     cd client
     npm install
     npm run dev
     ```

## Project Structure
- `/client`: Next.js frontend application.
- `/server`: Express.js backend API.
- `/docker-compose.yml`: Full stack orchestration.

## License
MIT
