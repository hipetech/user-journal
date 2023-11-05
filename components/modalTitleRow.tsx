import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

import { toggleModal } from "@/helpers/toggleModal";
import { ModalKeys } from "@/modals/modalKeys";

interface ModalTitleRowProps {
  title: string;
  modalId: ModalKeys;
}

const ModalTitleRow: React.FC<ModalTitleRowProps> = ({title, modalId}) => {
  return (
    <Box sx={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <IconButton size={"small"} onClick={() => toggleModal(modalId)}>
        <CloseIcon/>
      </IconButton>
    </Box>
  );
};

export default ModalTitleRow;
