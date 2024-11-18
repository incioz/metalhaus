# Metalhaus E-commerce

A full-stack e-commerce website built with React.js and Node.js, specializing in metal-themed merchandise and accessories.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Frontend Setup
bash
cd frontend
npm install
npm start
Frontend runs on http://localhost:3000

### Backend Setup
cd backend
npm install
npm start
Backend runs on http://localhost:5000

## 🏗️ Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcryptjs for password hashing
- CORS

## 📁 Project Structure

plaintext
metalhaus/
├── frontend/ # React frontend
│ ├── public/ # Static files
│ └── src/ # Source files
├── backend/ # Node.js backend
│ ├── controllers/ # Route controllers
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ └── server.js # Entry point
└── README.md

## 🛠️ Features

- User Authentication (Login/Register)
- Product Catalog
- Shopping Cart
- Secure Checkout
- Order History
- Admin Dashboard
- Responsive Design

## 🔒 Environment Variables

### Frontend
Create a `.env` file in the frontend directory:
plaintext
REACT_APP_API_URL=http://localhost:5000

### Backend
Create a `.env` file in the backend directory:
plaintext
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

## 📝 API Documentation

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Add new product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)

## 🚀 Deployment

The application can be deployed using platforms like:
- Frontend: Vercel, Netlify, or AWS S3
- Backend: Heroku, DigitalOcean, or AWS EC2

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

- Frontend Developer: Inci Ozkurt
- Backend Developer: Inci Ozkurt
- UI/UX Designer: Inci Ozkurt

## 🙏 Acknowledgments

- Create React App documentation
- Material-UI components
- MongoDB documentation
- Express.js
