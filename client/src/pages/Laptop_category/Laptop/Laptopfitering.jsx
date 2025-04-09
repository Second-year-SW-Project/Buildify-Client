import { Checkbox, Slider, TextField, FormControlLabel } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function Laptopfiltering() {
  return (


    <div className="mx-2  w-[187px] p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* RAM Size */}





      <div>
        <h3 className="text-md font-semibold mb-2">Brands</h3>


        {["32GB", "24GB", "16GB", "12GB", "8GB", "4GB"].map((size) => (
          <FormControlLabel key={size} control={<Checkbox />} label={size} className="block" />
        ))}


      </div>








      {/* Price Range */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Price Range</h3>


        <Slider min={0} max={300} valueLabelDisplay="auto" className="text-red-500" />
        
        
        <div className="flex items-center justify-between mt-2">
          <TextField size="small" value={0} className="w-16" />
          <span>-</span>
          <TextField size="small" value={300} className="w-16" />
        </div>
      </div>

      {/* Brands */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Brands</h3>


        {["Mac", "Karts", "Baals", "Bukks", "Luasis"].map((brand) => (
          <FormControlLabel key={brand} control={<Checkbox />} label={brand} className="block" />
        ))}


      </div>





      {/* Other Filters */}
      <div className="mt-4">
        <FormControlLabel control={<Checkbox />} label="On Sale" className="block" />
        <FormControlLabel control={<Checkbox />} label="In Stock" className="block" />
        <FormControlLabel control={<Checkbox />} label="Featured" className="block" />
      </div>





      {/* Ratings */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Ratings</h3>
        {[5, 4, 3, 2, 1].map((stars) => (
          <FormControlLabel
            key={stars}
            control={<Checkbox />}
            label={
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={i < stars ? "text-yellow-500" : "text-gray-300"} />
                ))}
              </div>
            }
            className="block"
          />
        ))}
      </div>
    </div>
  );
}
