import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function MediaCard({ image, title = "Media Card", description = "Media description..." }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Usage:
// <MediaCard image="/images/gpu.jpg" title="RTX 4090" description="High-performance gaming GPU" />

