# 🛡️ MusicMart - Admin Portal & Authentication

A lightweight, beginner-friendly React application featuring:
- **Authentication**: `Login.jsx` & `Register.jsx` with instant 1-click test accounts.
- **Admin Dashboard**: `Admin.jsx` with full CRUD operations for musical instruments, categories with live Sound & YouTube video previews, user account management, and database inspection.
- **Single Database**: `data/data.json` storing all users, categories, and instruments.

---

## 📂 Project Structure
```
shoping/
├── 📁 data/
│   └── 📄 data.json         # Single database file (Users, Categories, Instruments)
├── 📁 src/
│   ├── 📁 pages/
│   │   ├── 📄 Login.jsx     # User & Admin Login with 1-click test buttons
│   │   ├── 📄 Register.jsx  # Account Registration (User / Admin)
│   │   └── 📄 Admin.jsx     # Comprehensive Admin Portal (CRUD & Audio/Video Testing)
│   ├── 📁 redux/            # Store & AuthSlice
│   ├── 📁 services/         # Axios API client (api.js)
│   ├── 📁 styles/           # admin.css, login.css, index.css
│   ├── 📄 Allroutes.jsx     # Minimal routes mapping
│   ├── 📄 App.jsx           # App wrapper
│   └── 📄 main.jsx          # App entry with Redux Provider
```

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open **srv-dadb8pjncjis738mo0og** in your browser.

### 2. Default Test Credentials
- **Admin**: `admin@musicmart.com` / `admin123`
- **User**: `bojjaabhilash7@gmail.com` / `password123`
*(Or click the 1-Click Demo buttons on the Login page)*
