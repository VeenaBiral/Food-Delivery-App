import React from "react";
import { Grid, Card, CardContent, Skeleton, Box } from "@mui/material";

const Shimmer = () => {
  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {Array(8)
          .fill("")
          .map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3 }}>
                <Skeleton variant="rectangular" height={180} />
                <CardContent>
                  <Skeleton variant="text" height={30} width="90%" />
                  <Skeleton variant="text" height={20} width="70%" />
                  <Skeleton variant="text" height={20} width="50%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Shimmer;
