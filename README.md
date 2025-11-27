📦 Talaria – Global Freight & Shipment Tracking System

Talaria is a full-stack freight logistics platform designed to manage, monitor, and track shipments across the globe.
The system includes:

A secure authentication system

Shipment creation and management

Real-time package tracking

Interactive route maps (LeafletJS + OSM)

Status timelines

Automated uptime monitoring (UptimeRobot)

Fully deployed production environment (Vercel + Railway)

Talaria is engineered for speed, reliability, and global accessibility.

🚀 Tech Stack
Frontend

React (Vite)

TypeScript

TailwindCSS

Leaflet.js (Interactive maps)

Vercel Hosting

Backend

Node.js + Express

MongoDB + Mongoose

Railway Hosting

JWT Authentication

REST APIs

Monitoring

UptimeRobot (Heartbeat monitoring)

Automated downtime alerts

🌍 Live Links
Frontend (Production)

https://talaria-seven.vercel.app

Backend (Production)

https://freight-production-0630.up.railway.app

Uptime Monitoring Dashboard

https://dashboard.uptimerobot.com/monitors/801881857

🧠 Major Features
✅ User Authentication

Login / Register

JWT-based secure sessions

Protected dashboard pages

✅ Shipments Dashboard

Create shipments

Delete shipments

Search by tracking ID

Pagination

Real-time status indicators

✅ Real-Time Tracking Page

Live route mapping with Leaflet

Map markers for every travel point

Automatic zoom to route

Location-based route plotting

Delivery timeline with color-coded statuses

Status Styles:

Delivered → Green

In Transit → Yellow

Undelivered → Red

Timeline Example:
Delivered   • Australia
In Transit  • Singapore
Created     • France

✅ Interactive Mini Map

Blue route line

Orange markers

Auto-fit to all visited locations

✅ Responsive UI

Works smoothly on:

Mobile

Tablet

Desktop

🛠️ Environment Variables
Frontend (.env)
VITE_BACKEND_URL=https://freight-production-0630.up.railway.app

Backend (.env)
MONGO_URI=mongodb+srv://new-user-090:owaiz123@cluster0.yodj03o.mongodb.net/simpleLoginDB?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=uperstrongsecretkeyhere
PORT=7000

📡 API Endpoints
Auth
POST /auth/register
POST /auth/login

Shipments
GET    /api/shipments
POST   /api/shipments
GET    /api/shipments/:trackingId
DELETE /api/shipments/:trackingId

🗺️ Tracking Engine

The map uses this utility to convert city → coordinates:

getCoords("France") → [48.85, 2.35]


Then the route is plotted:

France

Singapore

Australia

The map auto-detects route, bounds, markers, and polyline.

🧰 Installation (Local)
Clone repository
git clone https://github.com/Shaikhuwaiz/Freight.git
cd Freight

Install dependencies
npm install

Start frontend
npm run dev

Start backend
cd backend
npm install
npm run dev

☁️ Deployment Workflow
Frontend (Vercel)

Automatically deployed on every push to main.

Backend (Railway)

Auto-deploys from GitHub

Environment variables configured inside Railway panel

Public domain:
freight-production-0630.up.railway.app

Monitoring

UptimeRobot checks server every 5 minutes.

📊 Monitoring & Reliability
Uptime Stats

(Example snapshot)

Last 7 days: 100%

Last 30 days: 100%

Avg response time: 224ms

UptimeRobot pings:

https://freight-production-0630.up.railway.app/

🎨 Screenshots (Recommended for GitHub)

You can add:

Login page

Shipments dashboard

Tracking route map

Timeline UI

UptimeRobot dashboard screenshot

🏁 Conclusion

Talaria is a complete end-to-end logistics tracking system with:

Fast global deployments

Full freight tracking logic

Beautiful responsive UI

Real-time map routing

Database-driven backend

Reliable production uptime

Secure authentication

Designed for scalability and production-ready usage.
