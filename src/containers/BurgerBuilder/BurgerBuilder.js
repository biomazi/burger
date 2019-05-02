import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
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
        purchesable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios
            .get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
                // doesnt work for some reason
                // this.setState(() => {
                //     return { ingredients: response.data };
                // });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

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
        this.setState(() => {
            return { loading: true };
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Marko Mazibrada',
                address: {
                    street: 'test street 21',
                    zipCode: '21000',
                    country: 'Serbia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios
            .post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState(() => {
                    return { loading: false, purchasing: false };
                });
            })
            .catch(err => {
                console.log(err);
                this.setState(() => {
                    return { loading: false, purchasing: false };
                });
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <>
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
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
