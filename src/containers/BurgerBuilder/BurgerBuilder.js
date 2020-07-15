import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import Aux from "../../hoc/Auxilary/Auxilary";
import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
  salad: 5,
  cheese: 10,
  meat: 40,
  bacon: 25,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 10,
    purchasable: false,
    ordering: false,
    loading: false,
  };

  goingToOrder = () => {
    this.setState({ ordering: true });
  };

  cancelOrder = () => {
    this.setState({ ordering: false });
  };

  continueOrder = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "ajai",
        address: {
          door: "221/18",
          street: "9th main",
          zipcode: "535675",
          state: "karnataka",
        },
        email: "emailtoajai@gmail.com",
        contact: "213423414",
      },
      deliverymode: "fast",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, ordering: false });
      })
      .catch((error) => this.setState({ loading: false, ordering: false }));
  };

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const upgradingIngredients = { ...this.state.ingredients };
    upgradingIngredients[type] = upgradingIngredients[type] + 1;
    let changeInPrice = this.state.totalPrice;
    changeInPrice = changeInPrice + INGREDIENT_PRICE[type];
    this.setState({
      ingredients: upgradingIngredients,
      totalPrice: changeInPrice,
    });
    this.updatePurchasableState(upgradingIngredients);
  };

  removeIngredientHandler = (type) => {
    const upgradingIngredients = { ...this.state.ingredients };
    if (upgradingIngredients[type] <= 0) return;
    upgradingIngredients[type] = upgradingIngredients[type] - 1;
    let changeInPrice = this.state.totalPrice;
    changeInPrice = changeInPrice - INGREDIENT_PRICE[type];
    this.setState({
      ingredients: upgradingIngredients,
      totalPrice: changeInPrice,
    });
    this.updatePurchasableState(upgradingIngredients);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        cancelOrder={this.cancelOrder}
        price={this.state.totalPrice}
        continueOrder={this.continueOrder}
        ingredientSummary={this.state.ingredients}
      ></OrderSummary>
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.ordering} modalClosed={this.cancelOrder}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          addingIngredient={this.addIngredientHandler}
          removingIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordering={this.goingToOrder}
          price={this.state.totalPrice}
        ></BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;
