import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false, // becomes true when we add at least 1 ingredient
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(result => this.setState({ingredients: result.data}))
            .catch(error => this.setState({error: true}));
    }

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
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Schwarzmuller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '12556',
                    country: 'Germany'
                },
                email: 'asd@asd.pl'
            },
            deliveryMethod: 'fastest'
        };

        this.setState({loading: true});

        axios.post('/orders.json', order)
            .then(response => console.log('response', response))
            .catch(error => console.error(error))
            .finally(() => this.setState({loading: false, purchasing: false}));
    };

    render() {
        const disabledInfo = {};
        let modalBody;
        let burger;

        if (this.state.ingredients) {
            for (let key of Object.keys(this.state.ingredients)) {
                disabledInfo[key] = !this.state.ingredients[key];
            }

            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls handleAddIngredient={this.handleAddIngredient}
                                   handleRemoveIngredient={this.handleRemoveIngredient}
                                   disabled={disabledInfo}
                                   totalPrice={this.state.totalPrice}
                                   purchasable={this.state.purchasable}
                                   handlePurchase={this.handlePurchase}/>
                </Fragment>
            );

            modalBody = <OrderSummary ingredients={this.state.ingredients}
                                      totalPrice={this.state.totalPrice}
                                      handleCancelPurchase={this.handleCancelPurchase}
                                      handleContinuePurchase={this.handleContinuePurchase}/>
        } else {
            burger = this.state.error ? <p>Ingredients can't be loaded ;(</p> : <Spinner/>;
        }

        if (this.state.loading) {
            modalBody = <Spinner/>;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing}
                       handleBackdropClick={this.handleCancelPurchase}>
                    {modalBody}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
