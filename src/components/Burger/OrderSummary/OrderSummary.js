import React from "react";
import Aux from "../../../hoc/Auxilary";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredientSummary).map(
    (igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
          {props.ingredientSummary[igKey]}
        </li>
      );
    }
  );
  return (
    <Aux>
      <h3>Order Summary</h3>
      <p>The following ingredients are been added and ready for checkout</p>
      <ul>{ingredientSummary}</ul>
      <p>Do you wanna proceed?</p>
    </Aux>
  );
};

export default orderSummary;
