import * as React from "react";

import { AppBar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >

        <Typography
          variant="h6"
          color="#EEEEEE"
          component="div"
          style={{
            fontSize: 35,
            paddingLeft: 20
          }}
        >
          LISTA DE CONTATOS
        </Typography>
      </div>
    </AppBar>
  )
}