import React, { Component } from 'react';
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
        purchesable: false,
        purchasing: false
    };

    addIngredientHandler = type => {
        this.setState(state => {
            state.ingredients[type] += 1;
            return {
                totalPrice: state.totalPrice + INGREDIENT_PRICES[type],
                ingredients: state.ingredients
            };
        }, this.updatePurchaseState);
        // alternativa
        // this.setState(prevState => {
        //     return {
        //         ingredients: {
        //             ...prevState.ingredients,
        //             [type]: prevState.ingredients[type] + 1
        //         },
        //         totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
        //     };
        // });
    };

    removeIngredientHandler = type => {
        this.setState(state => {
            if (state.ingredients[type] <= 0) {
                return;
            }
            state.ingredients[type] = state.ingredients[type] - 1;
            return {
                totalPrice: state.totalPrice - INGREDIENT_PRICES[type],
                ingredients: state.ingredients
            };
        }, this.updatePurchaseState);
    };

    updatePurchaseState = () => {
        const sum = Object.values(this.state.ingredients).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState(state => {
            return {
                purchesable: sum > 0
            };
        });
    };

    purchaseHandler = () => {
        this.setState(() => {
            return {
                purchasing: true
            };
        });
    };

    purchaseCancelHandler = () => {
        this.setState((state, props) => {
            return {
                purchasing: false
            };
        });
    };

    purchaseContinueHandler = () => {
        alert('continue')
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    purchesable={this.state.purchesable}
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    ordered={this.purchaseHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;
