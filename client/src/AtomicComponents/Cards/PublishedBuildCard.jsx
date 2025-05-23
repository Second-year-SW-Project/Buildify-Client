import { Card } from "@mui/material";
import PropTypes from "prop-types";

const PublishedBuildCard = ({ buildName, image, createdAt, components }) => {
  const imageUrl = image;
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : "N/A";

  return (
    <Card className="p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-2 border-[#D099FE9C] w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto min-h-[260px] flex flex-col items-center justify-center">
      <img
        src={imageUrl}
        alt={buildName}
        className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg mb-3 sm:mb-4"
      />
      <h2 className="text-lg sm:text-xl font-bold text-purple-800 text-center break-words w-full mb-1">{buildName}</h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-2">Created: {formattedDate}</p>
      <div className="w-full">
        <h3 className="text-base font-semibold text-gray-800 mb-2">Components Used:</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Array.isArray(components) && components.length > 0 ? (
            components.map((comp, idx) => (
              <div
                key={idx}
                className="flex items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="w-28 min-w-24 text-right font-semibold text-gray-500 lowercase pr-4">
                  {comp.type}
                </span>
                <span className="flex-1 text-gray-900 font-medium break-words">
                  {comp.name}
                  {comp.quantity > 1 && (
                    <span className="ml-2 text-xs text-gray-500 font-normal">×{comp.quantity}</span>
                  )}
                </span>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No components listed.</div>
          )}
        </div>
      </div>
    </Card>
  );
};

PublishedBuildCard.propTypes = {
  buildName: PropTypes.string.isRequired,
  image: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  components: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
      quantity: PropTypes.number,
    })
  ),
};

export default PublishedBuildCard;
