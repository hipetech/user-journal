import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

import HeaderButtons from "@/components/headerButtons";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Журнал користувачів
        </Typography>
        <HeaderButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
