import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetAllLocations = () => {
  const [locations, setLocations] = useState([]);

  const retrieveAllLocations = async () => {
    const response = await axios.get("http://localhost:8080/api/location/fetch");
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const allLocations = await retrieveAllLocations();
      if (allLocations) {
        setLocations(allLocations.locations);
      }
    };

    getAllLocations();
  }, []);

  const handleInput = (e) => {
    // Define your input handling logic here
    console.log(e.target.value);
  };

  return (
    <div className="list-group form-card border-color">
      <Link
        to="/home/all/hotel/location"
        className="btn btn-success fw-bold py-3 px-4 rounded-1 shadow-sm"
      >
        <b>All Locations</b>
      </Link>

      <select
        name="locationId"
        onChange={handleInput}
        className="form-control"
      >
        <option value="">Select Location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GetAllLocations;