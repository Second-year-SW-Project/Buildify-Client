import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ShoppingcartIcon({ cartColor = "primary", size = "large" })
{
  return (
    <div className="flex space-x-4">
      <ShoppingCartIcon fontSize={size} color={cartColor} />
    </div>
  );
}
