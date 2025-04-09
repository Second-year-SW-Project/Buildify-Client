import { Card, CardContent, Typography } from "@mui/material";

export default function Basiccard({ title = "Card Title", description = "Card description..." }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

// how to use:
// <BasicCard title="thamoj"  description="This card shows specifications." />
