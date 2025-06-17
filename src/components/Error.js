import { useRouteError } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
      <Typography variant="h3" gutterBottom color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="h5" gutterBottom>
        {err?.status || "Unknown Error"}: {err?.statusText || "Unexpected Error"}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default Error;