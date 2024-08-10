import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './AdminHeader.css'; 

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    window.location.reload(true);
    navigate("/home");
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 align-items-center">
      <li className="nav-item">
        <Link to="/admin/add-location" className="nav-link active" aria-current="page">
          <button className="custom-btn">Add Location</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/add-facility" className="nav-link active" aria-current="page">
          <button className="custom-btn">Add Facility</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/hotel/register" className="nav-link active" aria-current="page">
          <button className="custom-btn">Register Manager</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/hotel/register" className="nav-link active" aria-current="page">
          <button className="custom-btn">Add Hotel</button>
        </Link>
      </li>
      <li className="nav-item dropdown">
        <button className="custom-btn dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          View More
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link to="/user/admin/booking/all" className="dropdown-item">
              View All Bookings
            </Link>
          </li>
          <li>
            <Link to="" className="dropdown-item" onClick={adminLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
      <ToastContainer />
    </ul>
  );
};

export default AdminHeader;
