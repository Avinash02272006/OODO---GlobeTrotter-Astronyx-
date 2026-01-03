# 🌍 GlobeTrotter: The Future of Luxury Travel Planning

![GlobeTrotter Hero Banner](./globetrotter_hero_banner_1767438455857.png)

> **"Elevating every journey from a plan to a masterpiece."**

GlobeTrotter is a premium, production-grade travel orchestration platform designed for the modern explorer. Built with a focus on **Luxury Aesthetics**, **Real-time Collaboration**, and **Data-Driven Insights**, it transforms the chaotic process of trip planning into a seamless, cinematic experience.

---

## 🚀 The Problem
Travel planning is often fragmented across multiple tabs, spreadsheets, and maps. Existing tools are either too utilitarian (lacking soul) or too complex (lacking flow). Travelers need a unified workspace that is as beautiful as the destinations they visit.

## ✨ The Solution: GlobeTrotter
GlobeTrotter bridges the gap between functionality and luxury. It provides a centralized hub for:
- **Intelligent Orchestration**: Crafting multi-city itineraries with drag-and-drop ease.
- **Visual Storytelling**: Sharing journeys with a global community.
- **Financial Clarity**: Real-time budget analytics and expense tracking.
- **Seamless Discovery**: Finding curated activities and hidden gems.

---

## 💎 Key Features

### 🗓️ Smart Itinerary Builder
- **Dynamic Timeline**: A vertical, interactive timeline that adapts as you add stops and activities.
- **Drag-and-Drop**: Effortlessly reorder your journey with smooth animations powered by Framer Motion.
- **Multi-City Support**: Plan complex journeys across continents with ease.

### 📊 Real-time Budget Analytics
- **Visual Breakdown**: Beautiful doughnut charts visualizing expenses by category (Accommodation, Food, Transport, etc.).
- **Automatic Calculations**: Real-time updates to total costs as you plan.
- **Insights**: Get smart suggestions on where to save or splurge.

### 🗺️ Interactive Map Integration
- **Route Visualization**: See your entire journey mapped out with custom markers and paths.
- **Place Discovery**: Integrated search for landmarks, restaurants, and activities.
- **Leaflet & OpenStreetMap**: High-performance, interactive maps without the heavy overhead.

### 🤝 Travel Community
- **Social Feed**: Share your "Masterpiece Journeys" with a global community of travelers.
- **Real-time Interaction**: Like, comment, and follow fellow explorers with instant Socket.IO updates.
- **Inspiration Engine**: Discover trending destinations and top-rated itineraries.

### 🛡️ Enterprise-Grade Security
- **JWT Auth**: Secure, stateless authentication with automated token refreshing.
- **Role-Based Access**: Dedicated Admin Panel for platform oversight and analytics.
- **Data Integrity**: Powered by Prisma ORM for robust database interactions.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css) ![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js) ![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express) ![Socket.io](https://img.shields.io/badge/Socket.io-4.7-010101?style=flat-square&logo=socket.io) |
| **Database** | ![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql) |
| **Maps & Charts** | ![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet) ![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?style=flat-square&logo=chart.js) |

---

## 🏗️ Architecture

GlobeTrotter follows a modern decoupled architecture:
- **Client**: A high-performance Next.js application utilizing Server Components and Client-side state management.
- **Server**: A scalable Express.js API with a focus on middleware-driven security and real-time event handling.
- **Database**: A relational schema optimized for complex trip-stop-activity relationships.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 20+
- PostgreSQL (or Docker)
- A sense of adventure!

### 1. Clone & Install
```bash
git clone https://github.com/Avinash02272006/OODO---GlobeTrotter-Astronyx-.git
cd OODO---GlobeTrotter-Astronyx-
```

### 2. Environment Configuration
Create `.env` files in both `client` and `server` directories based on the `.env.example` files provided.

### 3. Database Setup
```bash
cd server
npm install
npx prisma generate
npx prisma db push
```

### 4. Launch
**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
cd ../client
npm install
npm run dev
```

---

## 🗺️ Future Roadmap
- [ ] **AI Concierge**: GPT-powered itinerary generation based on travel style.
- [ ] **Group Planning**: Real-time collaborative editing for group trips.
- [ ] **Offline Mode**: Access itineraries and maps without an internet connection.
- [ ] **Booking Integration**: Direct booking for flights and hotels within the app.

---
