const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 px-0">
      <div className="container-fluid">
        <div className="d-flex w-100 justify-content-between align-items-center">
          {/* Left-aligned brand */}
          <a className="navbar-brand ms-12" href="/">
            Booking System
          </a>

          {/* Right-aligned items */}
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler me-12"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link pe-4" href="/booking">
                    Book Slot
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link pe-3" href="/review">
                    Review Bookings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
