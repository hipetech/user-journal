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
    <Box sx={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
      borderBottom: 1,
      borderColor: "grey.500"
    }}>
      <Typography variant={"h6"}>
        {title}
      </Typography>
      <IconButton size={"small"} onClick={() => toggleModal(modalId)}>
        <CloseIcon/>
      </IconButton>
    </Box>
  );
};

export default ModalTitleRow;
