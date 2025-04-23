export default function Reviewcardhome({ review }) {

  const rating = review.rating || 0
  
  
  
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
      {/* Reviewer Info */}
      <div className="flex items-center justify-center mb-4">
        {/* <img src={review?.imgUrls?.[0]?.url} alt={review.name} className="w-12 h-12 rounded-full mr-3 object-cover" /> */}
        <h3 className="text-lg font-semibold">{review.comment}</h3>
      </div>

      {/* Star Rating --for future works */}

      {/*
      <div className="flex justify-center mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-yellow-500 text-xl ${i < rating ? "★" : "☆"}`}>
            ★
          </span>
        ))}
      </div> */}

      <div className="flex justify-center mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">
            {i < rating ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* Review Comment */}
      <p className="text-gray-600 text-sm text-justify">{review.description}</p>
    </div>
  );
}
