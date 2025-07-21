import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";

const wallpapers = [
  "https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421086/Home1_qma1wq.jpg",
  "https://cdn.sanity.io/images/yqd1zell/production/60e397563ffc93ff815c1baf9723c23cda658323-2480x1092.jpg",
  "https://cdn.sanity.io/images/yqd1zell/production/74ae894343a0e8844d0bb5fc23e566dd94e6a0ab-2480x1092.jpg",
  "https://cdn.sanity.io/images/yqd1zell/production/d7fc199fd599d5becad9e1a62e2918e2aef1ee82-2480x1092.jpg",
];

export default function Home_part1({ onShopNowClick }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % wallpapers.length);
    }, 8000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + wallpapers.length) % wallpapers.length);
  const next = () => setCurrent((prev) => (prev + 1) % wallpapers.length);

  // Mouse move handler to show/hide arrows
  const handleMouseMove = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const edgeThreshold = width * 0.1; // 10% of width
    setShowLeftArrow(x <= edgeThreshold);
    setShowRightArrow(x >= width - edgeThreshold);
  };

  // Hide arrows when mouse leaves
  const handleMouseLeave = () => {
    setShowLeftArrow(false);
    setShowRightArrow(false);
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Wallpaper images */}
      {wallpapers.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Wallpaper ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          draggable={false}
        />
      ))}

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-black bg-opacity-50 z-20">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-5 mt-[-300px]">
          Desk Deals Done Right.
        </h1>
        <p className="text-white text-lg md:text-xl mb-5">
          Save big on gaming gear bundles and deck out your desk.
        </p>
        <Button
          onClick={onShopNowClick}
          variant="contained"
          color="primary"
          className="!font-semibold !px-6 !py-3 !rounded-lg"
          sx={{
            backgroundColor: "primary100",
            "&:hover": {
              backgroundColor: "primary900",
            },
          }}
        >
          Shop PCs
        </Button>
      </div>

      {/* Left Arrow (only show if mouse near left edge) */}
      {showLeftArrow && (
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition"
          aria-label="Previous wallpaper"
        >
          &#8592;
        </button>
      )}
      {/* Right Arrow (only show if mouse near right edge) */}
      {showRightArrow && (
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-70 transition"
          aria-label="Next wallpaper"
        >
          &#8594;
        </button>
      )}

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {wallpapers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full border border-white transition bg-white ${
              idx === current ? "opacity-100" : "opacity-40"
            }`}
            aria-label={`Go to wallpaper ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
//i divided home to 5 parts.5components.this is first component
//for change image pass the prop and add propcall to image src//<--for future work