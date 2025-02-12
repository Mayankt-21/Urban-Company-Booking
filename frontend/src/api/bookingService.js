// bookingService.js
// This file defines API calls using axios to interact with the backend
import axios from "axios";

// Set the base URL for your backend API
const API_BASE_URL = "http://localhost:5000";

export const getSlots = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/slot`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching slots:", error);
    throw error;
  }
};

// Function to get all workers along with their slots
export const getWorkers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/worker`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workers:", error);
    throw error;
  }
};

// Function to fetch all reservations
export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservation`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

// Function to book a slot (Create a Reservation)
// Expects an object with slotId and userName properties
export const bookSlot = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservation`, payload);
    return response.data;
  } catch (error) {
    console.error("Error booking slot:", error);
    throw error;
  }
};

// Function to cancel a reservation by its id
export const cancelReservation = async (reservationId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/reservation/${reservationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    throw error;
  }
};
