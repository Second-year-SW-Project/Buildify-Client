import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

export default function Lazyloadingwrapper({ src, alt = "Image", width = "100%", height = "200px", skeletonColor = "#ccc" }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div style={{ width, height, position: "relative" }}>
      {!loaded && <Skeleton variant="rectangular" width={width} height={height} sx={{ bgcolor: skeletonColor }} />}
      <img
        src={src}
        alt={alt}
        style={{ width, height, objectFit: "cover", display: loaded ? "block" : "none" }}
      />
    </div>
  );
}

// how to ussssssseee:
// <LazyImage src="/images/gpu.png" width="300px" height="200px" skeletonColor="#ddd" />
