import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function Imageplaceholder({ bgColor = "#e0e0e0", size = "large" }) {
  return (
    <div className="flex items-center justify-center h-40 w-full" style={{ backgroundColor: bgColor }}>
      <ImageNotSupportedIcon fontSize={size} color="disabled" />
    </div>
  );
}

// how to usssseee:
// <ImagePlaceholder bgColor="#ffcccc" size="small" />
