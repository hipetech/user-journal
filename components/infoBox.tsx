import { Box, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface InfoBoxProps {
  message: string;
  icon: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({message, icon}) => {
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        {icon}
        <Typography variant={"h5"}>
          {message}
        </Typography>
      </Stack>
    </Box>
  );
};

export default InfoBox;
