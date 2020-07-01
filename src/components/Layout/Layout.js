import React from "react";
import Aux from "../../hoc/Auxilary";

import classes from "./Layout.css";

const layout = (props) => (
  <Aux>
    <div>Toolbar | SideDrawer | BackDrop</div>
    <main className={classes.content}>{props.children}</main>
  </Aux>
);

export default layout;
