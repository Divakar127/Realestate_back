import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden rounded-xl w-full sm:w-[300px] transform hover:scale-105 transition-transform duration-300">
      <Link to={`/listing/${listing._id}`} className="block">
        <div className="relative">
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="listing cover"
            className="h-[320px] sm:h-[220px] w-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
          />
          {listing.offer && (
            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Offer
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-2 w-full">
          <p className="truncate text-xl font-semibold text-slate-800">
            {listing.name}
          </p>
          <div className="flex items-center gap-1 text-gray-600">
            <MdLocationOn className="h-5 w-5 text-red-500" />
            <p className="text-sm truncate w-full">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {listing.description}
          </p>

          <div className="mt-3 flex justify-between items-center">
            <p className="text-lg font-semibold text-blue-600">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <div className="flex items-center text-gray-600 gap-3 text-xs">
              <span>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
              <span>|</span>
              <span>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
