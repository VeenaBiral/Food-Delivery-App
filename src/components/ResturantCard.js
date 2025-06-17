import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Star } from "@mui/icons-material";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, cloudinaryImageId } = resData?.info;

  return (
    <Card sx={{ maxWidth: 280, height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        image={CDN_URL + cloudinaryImageId}
        alt={name}
        sx={{ height: 160, objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {cuisines?.join(", ")}
        </Typography>
        <Box display="flex" alignItems="center">
          <Star sx={{ color: "#FFD700", fontSize: 18, marginRight: 0.5 }} />
          <Typography variant="body2" color="text.primary">
            {avgRating}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
