import React, { useEffect, useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import Shimmer from "./Shimmer";
import ResturantCard from "./ResturantCard";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfResturant, setListOfResturant] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.329731&lng=76.8342957&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setListOfResturant(restaurants);
    setFilteredList(restaurants);
  };

  const filterTopRated = () => {
    const filtered = listOfResturant.filter(
      (res) => res.info.avgRating > 4.5
    );
    setFilteredList(filtered);
  };

  if (filteredList.length === 0) return <Shimmer />;

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Button variant="contained" color="secondary" onClick={filterTopRated}>
          Top Rated Restaurants
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredList.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.info.id}>
            <Link to={`/resturants/${restaurant.info.id}`} style={{ textDecoration: 'none' }}>
              <ResturantCard resData={restaurant} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Body;
