const express = require("express");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");

const dotenv = require("dotenv");
// we require dotenv package

// const { chats } = require("./data/data");
// it connects data.js to sever.js
// we require data from data.js

const connectDB = require("./config/db");
// db.js is imported in sever.js

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const path = require("path");


dotenv.config();
// .env can be now acced using process.env
const app = express(); // app is variable which contains express

app.use(express.json());
// this will allow server to take json data from frontend

connectDB();
// this function call will connect db

/* 
app.get("/", (req,res) => {
    res.send("API is running");
});

*/

app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/message", messageRoutes);

// app.get() is a method use to get request
// and send response using res.send();

// Deployment Code Starts
// the below code require quite googling

const __dirname10 = path.resolve();

if(process.env.NODE_ENV === "production")
{
  app.use(express.static(path.join(__dirname10, "/frontend/build")));

  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname10, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req,res) => {
    res.send("API is Running Successfully");
  });
}

// Deployment Code Ends





app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// PORT variable contains data from hidden file .env

const server = app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));
// stored the server in server variable
// app.listen() is a method in express
// PORT is set to PORT variable form .env file

const io = require("socket.io")(server, {
  // the time of inactive after this threshold the connection will go off
  // to save the bandwidth
  pingTimeout: 60000,
  cors: {
    origin:
      "http://localhost:3000" /* setting connection between server and client(frontend)*/,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // for typing animation we need a live connection for that as well
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) {
      return console.log(" chat.users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) {
        return;
      }

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});

// we are now implementing socket.io
