import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SelectProductById = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || null;
  const [card, setCart] = useState({});
  const [time, setTime] = useState({ hour: "", minute: "", period: "AM" });
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState(false); // State for success message
  const [bookingDetails, setBookingDetails] = useState(null); // To store booking details
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/designs/${id}`)
        .then((res) => res.json())
        .then((json) => setCart(json));
    }
  }, [id]);

  const handleBooking = (event) => {
    event.preventDefault();

    const selectedTime = `${time.hour}:${time.minute} ${time.period}`;
    const details = {
      productId: id,
      productName: card.name,
      date,
      time: selectedTime,
    };

    // Save booking details to show below
    setBookingDetails(details);

    console.log("Booking Details:", details);

    // Dispatch an action to add the product and booking details to the cart
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...card,
        bookingDetails: details, // Add booking details
      },
    });

    // Show the success message
    setSuccessMessage(true);

    // Automatically hide success message after 10 seconds
    setTimeout(() => {
      setSuccessMessage(false);
      // navigate("/cart"); // Uncomment to navigate to the cart page after booking
    }, 7000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg rounded">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={card.image}
                  className="img-fluid rounded-start"
                  alt={card.title}
                  style={{ objectFit: "contain", height: "100%" }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body p-4">
                  <h5 className="card-title text-primary">Name: {card.name}</h5>
                  <h4 className="text-success">Price: ${card.price}</h4>
                  <h5 className="text-danger mt-3" >To book the tatto please fill the below form</h5>

                  {/* Success Message */}
                  {successMessage && (
                    <div className="alert alert-success text-center mb-4">
                      Booking confirmed successfully!
                    </div>
                  )}

                  {/* Render form or booking details depending on success */}
                  {!bookingDetails ? (
                    <form onSubmit={handleBooking} className="mt-3" style={{ paddingTop: "50px" }}>
                      <div className="mb-3">
                        <label className="form-label">Select Date</label>
                        <input
                          type="date"
                          className="form-control"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Select Time</label>
                        <div className="d-flex gap-2">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Hour"
                            min="1"
                            max="12"
                            required
                            value={time.hour}
                            onChange={(e) =>
                              setTime({ ...time, hour: e.target.value })
                            }
                          />
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Minute"
                            min="0"
                            max="59"
                            required
                            value={time.minute}
                            onChange={(e) =>
                              setTime({ ...time, minute: e.target.value })
                            }
                          />
                          <select
                            className="form-select"
                            value={time.period}
                            onChange={(e) =>
                              setTime({ ...time, period: e.target.value })
                            }
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        Confirm Booking
                      </button>
                    </form>
                  ) : (
                    // Display booking details
                    <div className="mt-3">
                      <h4>Booking Details:</h4>
                      <ul>
                        <li><strong>Product Name:</strong> {bookingDetails.productName}</li>
                        <li><strong>Selected Date:</strong> {bookingDetails.date}</li>
                        <li><strong>Selected Time:</strong> {bookingDetails.time}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3>Customer Reviews</h3>
        <p>⭐⭐⭐⭐⭐ (5/5)</p>
        <p>"Amazing product! Will definitely buy again."</p>
      </div>
    </div>
  );
};

export default SelectProductById;
