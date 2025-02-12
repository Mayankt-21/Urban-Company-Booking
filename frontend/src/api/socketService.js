import { io } from "socket.io-client";

// Set your WebSocket server URL
const SOCKET_URL = "http://localhost:5000"; // Point to backend's WebSocket server

// Variable to hold the socket connection
let socket = null;

// Function to establish a connection and return the socket instance
export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      // Either remove transports to use default negotiation:
      // transports: ["websocket"],
      // or allow both websocket and polling as a fallback:
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("WebSocket connected!", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected! Reason:", reason);
    });
  }
  return socket;
};

// Function to disconnect the socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Function to listen for slotBooked event
export const onSlotBooked = (callback) => {
  // Attach event listener regardless; Socket.IO queues events if not connected yet.
  socket && socket.on("slotBooked", callback);
};

// Function to listen for slotCanceled event
export const onSlotCanceled = (callback) => {
  socket && socket.on("slotCanceled", callback);
};
