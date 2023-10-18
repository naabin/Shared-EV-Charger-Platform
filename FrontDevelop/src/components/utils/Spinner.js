import { Box, CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <Box sx={{ display: "flex", justifySelf: "center" }}>
      <CircularProgress />
    </Box>
  );
};
