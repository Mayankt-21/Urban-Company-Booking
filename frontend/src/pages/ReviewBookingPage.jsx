import { useEffect, useState } from "react";
import axios from "axios";
import {
  connectSocket,
  disconnectSocket,
  onSlotCanceled,
} from "../api/socketService"; // Adjust the path as needed
import "bootstrap/dist/css/bootstrap.min.css";

const ReviewBookingPage = () => {
  const [reservations, setReservations] = useState([]);

  // WebSocket setup
  useEffect(() => {
    const socket = connectSocket();

    // Listen for reservation cancellation updates
    onSlotCanceled((data) => {
      console.log("Received slotCanceled event:", data);
      setReservations((prev) =>
        prev.filter((r) => r.id !== data.reservationId)
      );
    });

    // Cleanup: disconnect the socket on component unmount
    return () => {
      disconnectSocket();
    };
  }, []);

  // Fetch reservations on page load
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    axios
      .get("http://localhost:5000/reservation")
      .then((response) => setReservations(response.data))
      .catch((error) => console.error("Error fetching reservations:", error));
  };

  const cancelReservation = (reservationId) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      axios
        .delete(`http://localhost:5000/reservation/${reservationId}`)
        .then((response) => {
          alert(response.data.message);
          // The WebSocket event should update the state in real time.
        })
        .catch((error) => {
          console.error("Error cancelling reservation:", error);
          alert(
            error.response?.data?.message || "Error cancelling reservation"
          );
          fetchReservations(); // Refresh data on error
        });
    }
  };

  return (
    <div className="container-fluid min-vw-100 min-vh-100 p-4">
      <h1 className="mb-4">Your Reservations</h1>

      {reservations.length === 0 ? (
        <div className="alert alert-info">No reservations found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Booked By</th>
                <th>Slot Time</th>
                <th>Worker Name</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={reservation.id}>
                  <td>{index + 1}</td>
                  <td>{reservation.userName || "N/A"}</td>
                  <td>{reservation.slot?.time || "N/A"}</td>
                  <td>{reservation.worker?.name || "N/A"}</td>
                  <td>{reservation.worker?.specialization || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => cancelReservation(reservation.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewBookingPage;
