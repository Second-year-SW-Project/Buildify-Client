import DeleteIcon from '@mui/icons-material/Delete';

export default function Deleteicon({ deleteColor = "primary", size = "large" })
{
  return (
    <div className="flex space-x-4">
      <DeleteIcon fontSize={size} color={deleteColor} />
    </div>
  );
}
