import {
  List,
  ListItem,
  Typography,
  Box,
} from "@mui/material";
import { CDN_URL } from "../utils/constants";

const CartItemList = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => {
        const info = item.card?.info || item.info;
        const name = info?.name || "Item";
        const price =
          info?.price / 100 || info?.defaultPrice / 100 || 0;
        const imageId = info?.imageId;

        return (
          <ListItem
            key={index}
            divider
            alignItems="flex-start"
            sx={{ display: "flex", gap: 2 }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={CDN_URL + imageId}
                alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            {/* Name & Price */}
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
  );
};

export default CartItemList;
