import PersonIcon from '@mui/icons-material/Person';


export default function Personicon({ userColor = "action", size = "large" ,})
{
    return (
      <div className="flex space-x-4">
        <PersonIcon fontSize={size} color={userColor} />
      </div>
    );
}