import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import axios from "axios";

const Checkout = () => {
  const service = useLoaderData();
  const { _id, title, price, img } = service;
  const { user } = useContext(AuthContext);
  // Handle Book service
  const handleBookService = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user.email;
    const order = {
      customerName: name,
      service_id: _id,
      service: title,
      img,
      date,
      email,
      price,
    };
    axios
      .post("http://localhost:5000/booking", order)
      .then((data) => {
        const result = data.data;
        if (result.insertedId) {
          alert("successfully booked your service");
          // form.reset();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h2 className="text-center text-3xl">Book Service: {title}</h2>

      <div className="card bg-base-100 w-full shrink-0 shadow-xl">
        <form onSubmit={handleBookService} className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                defaultValue={user?.displayName}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                type="text"
                name="price"
                defaultValue={"$" + price}
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
