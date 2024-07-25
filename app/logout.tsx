"use client";

import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: "8px",
  textTransform: "none",
}));

export default function Logout() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <StyledButton onClick={handleLogout} variant="contained">
      Logout
    </StyledButton>
  );
}
