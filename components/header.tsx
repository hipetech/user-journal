import React from "react";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Журнал користувачів
        </Typography>
        <Button color="inherit">Додати користувача</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
