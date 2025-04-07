import { Button, Card, CardContent, CardMedia, Typography, Snackbar } from "@mui/material";
import { Cart } from "./CartContext";
import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar";

const dummyProducts = [
  { id: 1, name: "RTX 3060 Graphics Card", price: 399.99, image: "/images/rtx3060.jpg" },
  { id: 2, name: "Intel i7-12700K Processor", price: 319.99, image: "/images/i7-12700k.jpg" },
  { id: 3, name: "Corsair 16GB RAM (2x8GB)", price: 89.99, image: "/images/ram16gb.jpg" },
];

const ProductList = () => {


  return (
    <div>
      <Navbar></Navbar>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {dummyProducts.map((product) => (
        <Card key={product.id} className="shadow-lg">
          <CardMedia component="img" height="140" image={product.image} alt={product.name} />
          <CardContent>
            <h1 variant="h6">{product.name}</h1>
            <h1 variant="body2">${product.price.toFixed(2)}</h1>
            <Button  variant="contained" color="primary">
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
      
      {/* Snackbar Notification */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Item added to cart!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
    </div>
  );
};

export default ProductList;
