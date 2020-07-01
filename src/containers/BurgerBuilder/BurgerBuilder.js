import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Aux from "../../hoc/Auxilary";

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
  };

  goingToOrder = () => {
    this.setState({ ordering: true });
  };

  cancelOrder = () => {
    this.setState({ ordering: false });
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
    return (
      <Aux>
        <Modal show={this.state.ordering} modalClosed={this.cancelOrder}>
          <OrderSummary
            ingredientSummary={this.state.ingredients}
          ></OrderSummary>
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
