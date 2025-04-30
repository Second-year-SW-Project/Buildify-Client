export default function Reviewcardhome({ review }) {
  const rating = review.rating || 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 max-w-sm">
      {/* Top section: image + name + product type + stars */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          <img
            src={review?.imgUrl || "https://cdn-icons-png.freepik.com/256/3135/3135768.png"}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-800 ml-2 ">{review.type}</h3>
            <p className="text-xs text-blue-600 font-medium ml-2 ">
              Purchased: {review.type}
            </p>
          </div>
        </div>
        {/* Star Rating */}
        <div className="flex items-start">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              {i < rating ? "★" : "☆"}
            </span>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <p className="mt-3 text-sm text-gray-900 leading-snug">
        {review.comment}
      </p>
    </div>
  );
}
