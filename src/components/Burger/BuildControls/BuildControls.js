import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong> Rupees
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          add={() => props.addingIngredient(control.type)}
          remove={() => props.removingIngredient(control.type)}
          disabled={props.disabled[control.type]}
        ></BuildControl>
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordering}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
