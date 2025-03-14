import Button from "@mui/material/Button";

export default function PCcardhome({ name="Player One", image="/pc1.png", specs="RTX 4060 Ti, Ryzen 7 5800X", price="420,000 LKR" }) {
  return (


    
    <div className="w-full max-w-[280px] bg-white shadow-lg rounded-lg overflow-hidden p-4 text-center">



      <img src={image} alt={name} className="size-[250px] object-cover rounded-md mb-4" />

      <h3 className="text-lg font-semibold">{name}</h3>

      <p className="text-gray-500 text-sm">{specs}</p>

      <p className="text-lg font-bold mt-2">{price}</p>


      <Button variant="contained" color="primary" className="!mt-4 !w-full">
        Shop
      </Button>



    </div>
  );
}



//this is onlu for home page second component.
//<pccardhome   name="your name" image="src" specs="specs with spaces" price="price">