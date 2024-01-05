import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import { Paper } from "@mui/material";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Profile");

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    console.log(`${itemName} Clicked`);
  };

  const listItemStyle = (itemName: string) => ({
    backgroundColor: selectedItem === itemName ? "#e0e0e0" : "transparent",
    cursor: "pointer",
  });

  return (
    <>
      {/*  <Drawer
       variant="permanent"
       sx={{
         width: 240,
         flexShrink: 0,
         "& .MuiDrawer-paper": {
           width: 240,
           boxSizing: "border-box",
         },
       }}
     > */}
      <Paper elevation={0}>
        <List>
          <ListItem
            onClick={() => handleItemClick("Profile")}
            style={listItemStyle("Profile")}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("Messages")}
            style={listItemStyle("Messages")}
          >
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem
            onClick={() => handleItemClick("Settings")}
            style={listItemStyle("Settings")}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Paper>
      {/*  </Drawer> */}
    </>
  );
};

export default Sidebar;
