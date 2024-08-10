import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const AddLocation = () => {
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  let navigate = useNavigate();

  const saveLocation = (e) => {
    e.preventDefault();
    let data = { city, description };

    fetch("http://localhost:8080/api/location/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);

        console.log(res.responseMessage);

        navigate("/home");
        toast.warn(res.responseMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    });
  };

  const cityOptions = [
    "Bangalore",
    "Mumbai",
    "Hyderabad",
    "Mysore",
    "Chennai",
    "Pune"
  ];

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h5 className="card-title">Add Location</h5>
          </div>
          <div className="card-body text-color">
            <form onSubmit={saveLocation}>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  <b>Location (city)</b>
                </label>
                <select
                  className="form-control"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  required
                >
                  <option value="" disabled>Select city...</option>
                  {cityOptions.map((cityOption, index) => (
                    <option key={index} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Location Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Enter description..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
              >
                Add Location
              </button>

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
