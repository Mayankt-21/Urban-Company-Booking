import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Notice Routes is used instead of Switch
import BookingPage from "./pages/BookingPage";
import ReviewBookingPage from "./pages/ReviewBookingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      {/* The <Routes> component replaces <Switch> in React Router v6 */}
      <Routes>
        {/* Route for booking page */}
        <Route path="/booking" element={<BookingPage />} />
        {/* Route for review bookings page */}
        <Route path="/review" element={<ReviewBookingPage />} />
        {/* Default route: renders BookingPage */}
        <Route path="*" element={<BookingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
