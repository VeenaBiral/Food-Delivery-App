import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MENU_URL, CDN_URL } from "../utils/constants";
import {addItem} from "../utils/cartSlice"
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { resId } = useParams();

  const handleItem =(item) =>{
    dispatch(addItem(item))
  }
  console.log(handleItem)

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

  // Extract restaurant info
  const restaurantInfo = resInfo?.data?.cards?.[2]?.card?.card?.info;
  const restaurantName = restaurantInfo?.name || "Restaurant";
  const cuisines = restaurantInfo?.cuisines?.join(", ") || "Various";

  // Extract item cards
  const menuCards =
    resInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const itemCards = menuCards.flatMap(
    (card) => card?.card?.card?.itemCards || []
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {restaurantName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {cuisines}
          </Typography>
          <Divider/>
          <Typography variant="h5" gutterBottom>
            Menu
          </Typography>
          <List>
            {itemCards.map((item) => {
              const name = item.card.info.name;
              const price =
                item.card.info.price / 100 ||
                item.card.info.defaultPrice / 100;
              const imageId = item.card.info.imageId;

              return (
                <ListItem
                  key={item.card.info.id}
                  divider
                  alignItems="flex-start"
                  sx={{ display: "flex", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 140,
                      height: 120,
                      position: "relative",
                      borderRadius: 2,
                    }}
                  >
                    <img
                      src={CDN_URL + imageId}
                      alt={name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "black",
                        textTransform: "none",
                        borderRadius: 2,
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                      }}
                      onClick={() => handleItem(item)}
                    >
                      Add +
                    </Button>
                  </Box>

                  {/* Name & Price on Right */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      ₹{price}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RestaurantMenu;
