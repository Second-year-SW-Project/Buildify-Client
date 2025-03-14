import { Card, CardContent, Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Simulated Image Placeholder */}
      <Skeleton variant="rectangular" height={140} />
      
      <CardContent>
        {/* Simulated Title Placeholder */}
        <Skeleton variant="text" width="80%" />
        
        {/* Simulated Description Placeholder */}
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );
}

// Use:
// <LoadingSkeleton />
