import { Card } from "@mui/material";
import PropTypes from "prop-types";

const PCBuildCard = ({ name, createdAt, image, onClick, onDelete, onEdit }) => {
  // Format the creation date
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "N/A";
  const imageUrl =
    image ||
    "https://buildmypc.lk/wp-content/uploads/2024/05/Amethyst-GAming-PC-Build-MY-PC-600x600.jpg";

  return (
    <Card
      className="p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-2 border-[#D099FE9C] cursor-pointer flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto min-h-[340px]"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for build ${name}`}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg mb-3 sm:mb-4"
      />
      <h2 className="text-lg sm:text-xl font-bold text-purple-800 text-center mb-1 sm:mb-2 break-words w-full">
        {name}
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-2">
        Created: {formattedDate}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 w-full min-w-0">
        <button
          className="w-full sm:w-auto flex-1 border border-purple-800 text-purple-800 font-semibold rounded-lg px-2 py-2 bg-white transition-colors duration-200 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-800 text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit();
          }}
          tabIndex={0}
        >
          Edit
        </button>
        <button
          className="w-full sm:w-auto flex-1 border border-[#e53e3e] text-[#e53e3e] font-semibold rounded-lg px-2 py-2 bg-white transition-colors duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-[#e53e3e] text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete();
          }}
          tabIndex={0}
        >
          Delete
        </button>
      </div>
    </Card>
  );
};

PCBuildCard.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  image: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default PCBuildCard;
