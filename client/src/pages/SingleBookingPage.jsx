import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

export default function SingleBookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/bookings").then((res) => {
      const foundBooking = res.data.find(({ _id }) => _id === id);

      if (foundBooking) {
        setBooking(foundBooking);
        setLoading(false);
      }
    });
  }, [id]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className={"my-2 block"}>
        {booking.place.address}
      </AddressLink>
      <div className="flex justify-between bg-gray-200 p-6 my-6 rounded-2xl items-center">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div className="text-center">Total Price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
