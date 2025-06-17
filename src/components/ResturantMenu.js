import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MENU_URL } from "../utils/constants";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const ResturantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_URL + resId);
      const json = await data.json();
      setResInfo(json);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    } finally {
      setLoading(false);
    }
  };

  // Extract restaurant name and cuisines
  const restaurantInfo = resInfo?.data?.cards?.[2]?.card?.card?.info;
  const restaurantName = restaurantInfo?.name || "Restaurant";
  const cuisines = restaurantInfo?.cuisines?.join(", ") || "Various";
  const imageId = restaurantInfo?.imageId

  // Extract item cards
  const menuCards =
    resInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const itemCards = menuCards.flatMap((card) => card?.card?.card?.itemCards || []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {restaurantName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {cuisines}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" component="h2" gutterBottom>
            Menu
          </Typography>

          <List>
            {itemCards.map((item) => {
              const name = item.card.info.name;
              const price =
                item.card.info.price / 100 || item.card.info.defaultPrice / 100;

              return (
                <ListItem
                  key={item.card.info.id}
                  divider
                  secondaryAction={
                    <Typography variant="body1" fontWeight="bold" color="green">
                      ₹{price}
                    </Typography>
                  }
                >
                  <ListItemText primary={name} />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResturantMenu;
