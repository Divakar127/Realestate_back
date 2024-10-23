import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import ListingItem from "../Components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const [offersRes, rentRes, saleRes] = await Promise.all([
          fetch("/api/v1/listing/get?offer=true&limit=4"),
          fetch("/api/v1/listing/get?type=rent&limit=4"),
          fetch("/api/v1/listing/get?type=sale&limit=4"),
        ]);

        if (!offersRes.ok || !rentRes.ok || !saleRes.ok) {
          throw new Error("Failed to fetch listings");
        }

        const offersData = await offersRes.json();
        const rentData = await rentRes.json();
        const saleData = await saleRes.json();

        setOfferListings(offersData);
        setRentListings(rentData);
        setSaleListings(saleData);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-100">
      {/* Top Section */}
      <div className="flex flex-col gap-6 p-10 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-4xl lg:text-6xl">
          Find your next <span className="text-slate-500">Perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          We have the best places to help you find your next home,
          <br />
          with a wide variety of properties to choose from.
        </p>
        <Link
          to={"/search"}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Let's get started...
        </Link>
      </div>

      {/* Swiper for Offer Listings */}
      <div className="max-w-6xl mx-auto p-4">
        <Swiper navigation pagination={{ clickable: true }} className="my-10">
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="bg-black bg-opacity-30 h-full flex items-center justify-center">
                  <h2 className="text-white text-xl font-semibold text-center">{listing.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Listing Sections */}
      <div className='max-w-6xl mx-auto p-4 flex flex-col gap-8 my-10'>
        {offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p>Subscribe to our newsletter for the latest listings</p>
          <form className="flex justify-center mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md">Subscribe</button>
          </form>
          <p className="mt-4">© 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
