import React from "react";
import Aux from "../../../hoc/Auxilary";

import Button from "../../UI/Button/Button";

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
      <p>
        <strong>Total Price : {props.price}</strong>/- Rupees
      </p>
      <p>Do you wanna proceed?</p>
      <Button btnType="Danger" clicked={props.cancelOrder}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continueOrder}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
