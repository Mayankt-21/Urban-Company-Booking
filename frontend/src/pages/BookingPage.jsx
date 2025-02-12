import { useEffect, useState } from "react";
import { getWorkers, bookSlot } from "../api/bookingService";
import {
  connectSocket,
  onSlotBooked,
  onSlotCanceled,
} from "../api/socketService";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingPage = () => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const socket = connectSocket();
    onSlotBooked((data) => {
      console.log(
        `Real-Time Update: Slot ${data.slotId} booked by ${data.userName}`
      );
    });
    onSlotCanceled((data) => {
      console.log(`Real-Time Update: Slot ${data.slotId} is now available`);
    });
  }, []);

  useEffect(() => {
    getWorkers()
      .then((data) => setWorkers(data))
      .catch((error) => console.error("Error fetching workers:", error));
  }, []);

  const handleWorkerChange = (e) => {
    const workerId = parseInt(e.target.value, 10);
    const worker = workers.find((w) => w.id === workerId) || null;
    setSelectedWorker(worker);
    setSelectedSlot(null);
  };

  const handleSlotChange = (e) => {
    const slotId = parseInt(e.target.value, 10);
    if (selectedWorker) {
      const slot = selectedWorker.slots.find((s) => s.id === slotId) || null;
      setSelectedSlot(slot);
    }
  };
  const submitBooking = () => {
    if (!selectedWorker || !selectedSlot || !userName.trim()) {
      alert("Please select a worker, choose a slot, and enter your name.");
      return;
    }
    // Include workerId in the payload
    const payload = {
      slotId: selectedSlot.id,
      userName,
      workerId: selectedWorker.id,
    };
    bookSlot(payload)
      .then((res) => {
        alert("Slot booked successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error booking slot:", error);
        alert("Booking failed. Please try again.");
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 min-vw-100">
      <h1 className="mb-4 text-center">Book a Worker Slot</h1>

      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="workerSelect">Select a Worker</label>
          <select
            id="workerSelect"
            className="form-control"
            onChange={handleWorkerChange}
            defaultValue=""
          >
            <option value="" disabled>
              -- Choose a Worker --
            </option>
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name} ({worker.specialization})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Slot Selection Dropdown */}
      {selectedWorker && (
        <div className="form-group mt-3">
          <label htmlFor="slotSelect">Select an Available Slot</label>
          <select
            id="slotSelect"
            className="form-control"
            onChange={handleSlotChange}
            defaultValue=""
          >
            <option value="" disabled>
              -- Choose a Slot --
            </option>
            {selectedWorker.slots
              .filter((slot) => !slot.isBooked)
              .map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.time}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* User Name Input */}
      {selectedWorker && selectedSlot && (
        <div className="form-group mt-3">
          <label htmlFor="userName">Enter Your Name</label>
          <input
            type="text"
            id="userName"
            className="form-control"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      )}

      {/* Booking Button */}
      {selectedWorker && selectedSlot && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={submitBooking}>
            Book Slot
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
