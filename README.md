# Make India Clean 🇮🇳

A scalable full-stack MERN application built to facilitate organizing, discovering, and joining cleaning campaigns across India. Features include authentication, city-wise filtering, drive creation, Media (video/gallery) uploading capabilities, and fundraising through Razorpay.

## 🚀 Features
- **User Authentication**: Secure JWT-based login and registration with Role-Based Access Control (Volunteer, Organizer, Admin).
- **Campaign Dashboard**: Discover cleaning campaigns across India filtered by City.
- **Start a Drive**: Organizers and Admins can create campaigns setting targets, date, time, and locations.
- **Fundraising**: Razorpay integration to receive monetary support for campaigns.
- **Media Module**: Placeholders for gallery and clean-up videos.
- **Responsive UI**: Built with React, Tailwind CSS, and React Router.

## 🏗️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router Dom
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Payment**: Razorpay SDK

## 📁 Project Structure
- `/client`: Vite-powered React Frontend application.
- `/server`: Express.js backend API and MongoDB Models.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB installed locally or MongoDB Atlas URI

### 1. Backend Setup
1. Open terminal and navigate to server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `server` directory using `.env.example` as reference:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/makeindiaclean
   JWT_SECRET=super_secret_jwt_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
4. Start the server:
   ```bash
   npm start
   # or natively `node server.js`
   ```
   **Server should run on http://localhost:5000**

### 2. Frontend Setup
1. Open a new terminal and navigate to client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_RAZORPAY_KEY_ID=your_razorpay_key
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
   **App should open on http://localhost:5173**

---

## 🧪 Testing the API
Basic API tests can be done using Postman or ThunderClient:
1. `POST /api/auth/register` - Create Admin/Volunteer.
2. `POST /api/auth/login` - Obtain JWT Token.
3. `POST /api/drives` - Send Bearer token to create a drive.
4. `GET /api/drives?city=Mumbai` - Fetch details.

## 🚀 Deployment

### Backend (Render / Heroku)
1. Push your code to GitHub.
2. Link the repository to Render/Heroku.
3. Set the build directory appropriately or run `cd server && npm install`.
4. Ensure all environment variables (MONGO_URI, JWT_SECRET, etc.) are injected in the platform dashboard.

### Frontend (Vercel / Netlify)
1. Link to Vercel/Netlify.
2. Root directory: `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_URL` pointing to the deployed backend URL.

---
Built as a senior engineering robust boilerplate. Clean code, modular, and ready for production scaling.
