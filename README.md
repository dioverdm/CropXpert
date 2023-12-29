# CropXpert - Farmer Expert Chat Application

## Overview
Welcome to the CropXpert repository! CropXpert is a web-based chat application that connects farmers with experts, allowing them to seek advice, share problems, and get expert solutions. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and utilizes socket.io for real-time communication.

## Features
- **Real-time Chat:** Farmers can connect with experts and have real-time conversations.
- **Expert Advice:** Experts can provide advice, solutions, and guidance to farmers.
- **User Authentication:** Secure user authentication using JWT (JSON Web Tokens).
- **MongoDB Database:** User data and chat history are stored in a MongoDB database.
- **Responsive Design:** The application is designed to be responsive across various devices.

## Project Structure
- **backend:** Contains the Node.js server code for handling authentication, chat, and database interactions.
  - **server.js:** Express server setup with API endpoints and socket.io integration.
  - **routes/auth.js:** Express router for handling authentication-related API requests.
  - **routes/chat.js:** Express router for handling chat-related API requests.
- **frontend:** Holds the React frontend code, including components and pages.
  - **src/components:** Reusable UI components.
  - **src/pages:** Pages representing different views.
  - **src/App.js:** Main component defining the application routes.
  - **src/index.js:** Entry point rendering the React app.
  - **src/App.css:** Styles for the application.

## Dependencies

### Backend
- **express:** Web application framework for Node.js.
- **socket.io:** Real-time communication library.
- **mongodb:** Official MongoDB driver for Node.js.
- **jsonwebtoken:** JSON Web Token implementation for user authentication.
- **bcryptjs:** Library for hashing passwords.
- **dotenv:** Loads environment variables from a .env file.
- **express-async-handler:** Utility for handling asynchronous errors in Express.

### Frontend
- **react:** JavaScript library for building user interfaces.
- **react-router-dom:** Library for declarative routing in React applications.
- **socket.io-client:** Client-side library for socket.io.
- **axios:** HTTP client for making API requests.
- **@chakra-ui/react:** Chakra UI is a simple, modular, and accessible component library for React.
- **framer-motion:** Library for creating smooth animations.
- **react-scrollable-feed:** Scrollable feed component for React.

## Setup

### Backend
1. Run `npm install` to install dependencies.
2. Set up your MongoDB database and update the connection details in `server.js`.
3. Create a `.env` file in the `root` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=YOUR_MONGO_DB_CONNECTION_STRING
   JWT_SECRET=YOUR_JWT_SECRET
   NODE_ENV=production
4. Run `npm start` to start the Node.js server.

### Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the frontend directory with the following variable:
    ```env
   REACT_APP_CLOUDINARY_URL=YOUR_CLOUDINARY_URL
4. Run `npm start` to start the development server.

## Usage
1. Access the application at [http://localhost:3000](http://localhost:3000).
2. Register or log in to start chatting with experts.
3. Enjoy real-time communication and expert advice!

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the [MIT License](LICENSE).
