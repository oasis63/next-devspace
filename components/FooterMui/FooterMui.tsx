// components/FooterMui.tsx

import { Container, Typography } from "@mui/material";

const FooterMui = () => {
  return (
    <Container
      component="footer"
      sx={{ mt: 4, py: 2, bgcolor: "background.paper" }}
      // sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        &copy; 2023 My Dating App. All rights reserved.
      </Typography>
    </Container>
  );
};

export default FooterMui;
