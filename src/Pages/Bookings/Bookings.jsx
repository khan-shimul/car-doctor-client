import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import BookingRow from "./BookingRow";
import axios from "axios";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const url = `http://localhost:5000/booking?email=${user.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [url]);

  //   Handling the booked services
  const handleDelete = (id) => {
    const proceed = confirm("Are you sure want to delete?");
    if (proceed) {
      axios
        .delete(`http://localhost:5000/booking/${id}`)
        .then((data) => {
          const result = data.data;
          if (result.deletedCount) {
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  //   Handle confirm status
  const handleConfirm = (id) => {
    axios
      .patch(`http://localhost:5000/booking/${id}`, {
        status: "confirm",
      })
      .then((data) => {
        const result = data.data;
        if (result.modifiedCount) {
          const remaining = bookings.filter((booking) => booking._id !== id);
          const updated = bookings.find((booking) => booking._id === id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>My Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ACTION</th>
              <th>IMAGE</th>
              <th>SERVICE</th>
              <th>DATE</th>
              <th>PRICE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
                handleConfirm={handleConfirm}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
