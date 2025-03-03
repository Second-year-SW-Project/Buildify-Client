import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";

export default function Actioncard({ title = "Action Card", description = "Click below for details", buttonText = "Learn More", onClick }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>{buttonText}</Button>
      </CardActions>
    </Card>
  );
}

// how to use:
// <ActionCard title="Buy Now" description="Check the latest deals" buttonText="Shop Now" onClick={() => console.log("Button Clicked")} />
