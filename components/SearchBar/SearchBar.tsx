// components/SearchBar.tsx

import React from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  return (
    <Paper className={styles.searchBar}>
      <IconButton className={styles.searchIcon}>
        <SearchIcon />
      </IconButton>
      <InputBase className={styles.searchInput} placeholder="Search..." />
    </Paper>
  );
};

export default SearchBar;
