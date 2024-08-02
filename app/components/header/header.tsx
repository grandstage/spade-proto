"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import styles from "./header.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <AppBar position="static" sx={{ "& .MuiToolbar-root": { padding: '12px 36px' } }}>
      <Toolbar className={styles.header} >
        <div className={styles["logo-container"]}>
          <Image
            src="/spade-ai-logo-light.png"
            alt="Description"
            width={34}
            height={38.57}
            priority
          />
          <h1 className={styles["logo-text"]}>Spade AI</h1>
        </div>
        <div className={styles["profile-container"]}>
          <Avatar
            alt="Profile Picture"
            src="/spade-ai-logo.png"
            sx={{ width: 48, height: 48, border: "1px solid #ffffff" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
