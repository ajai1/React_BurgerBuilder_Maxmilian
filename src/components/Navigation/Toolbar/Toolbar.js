import React from "react";
import classes from "./Toolbar.css";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";

import Logo from "../../Logo/Logo";

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
      <div className={classes.Logo}>
        <Logo></Logo>
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
