import SearchIcon from '@mui/icons-material/Search';


export default function Searchicon ({ searchColor = "secondary", size = "large" })
{
    return (
      <div className="flex space-x-4">
        <SearchIcon fontSize={size} color={searchColor} />
      </div>
    );
  }