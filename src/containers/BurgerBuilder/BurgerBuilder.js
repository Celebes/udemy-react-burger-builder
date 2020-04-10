import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false, // becomes true when we add at least 1 ingredient
        purchasing: false
    };

    handleAddIngredient = (type) => {
        this.setState((prevState) => {
            const newIngredients = {...prevState.ingredients};
            newIngredients[type] += 1;
            const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
            return {
                ingredients: newIngredients,
                totalPrice: newPrice,
                purchasable: this.updatePurchasableState(newIngredients)
            };
        });
    };

    handleRemoveIngredient = (type) => {
        this.setState((prevState) => {
            if (!prevState.ingredients[type]) {
                return prevState;
            }
            const newIngredients = {...prevState.ingredients};
            newIngredients[type] -= 1;
            const newPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            return {
                ingredients: newIngredients,
                totalPrice: newPrice,
                purchasable: this.updatePurchasableState(newIngredients)
            };
        });
    };

    updatePurchasableState = (ingredients) => {
        const sumOfIngredients = Object.keys(ingredients).reduce((sum, key) => sum + ingredients[key], 0);
        return sumOfIngredients > 0;
    };

    handlePurchase = () => {
        this.setState({purchasing: true});
    };

    handleCancelPurchase = () => {
        this.setState({purchasing: false});
    };

    handleContinuePurchase = () => {
        alert('ok!');
    };

    render() {
        const disabledInfo = {};
        for (let key of Object.keys(this.state.ingredients)) {
            disabledInfo[key] = !this.state.ingredients[key];
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing}
                       handleCancelPurchase={this.handleCancelPurchase}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  totalPrice={this.state.totalPrice}
                                  handleCancelPurchase={this.handleCancelPurchase}
                                  handleContinuePurchase={this.handleContinuePurchase}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls handleAddIngredient={this.handleAddIngredient}
                               handleRemoveIngredient={this.handleRemoveIngredient}
                               disabled={disabledInfo}
                               totalPrice={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               handlePurchase={this.handlePurchase}/>
            </Fragment>
        );
    }
}

export default BurgerBuilder;
