import React, { Component } from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";

import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("order summary updates");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredientSummary).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
            {this.props.ingredientSummary[igKey]}
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
          <strong>Total Price : {this.props.price}</strong>/- Rupees
        </p>
        <p>Do you wanna proceed?</p>
        <Button btnType="Danger" clicked={this.props.cancelOrder}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continueOrder}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
