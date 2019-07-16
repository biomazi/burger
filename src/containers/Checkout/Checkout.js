import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classes from './Checkout.module.css';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {}
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = parseInt(param[1]);
        }
        this.setState((state, props) => {
            return { ingredients: ingredients };
        });
        console.log(this.props);
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace({
            pathname: '/checkout/contact-data',
            state: { totalPrice: this.props.location.state.price }
        });
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={() => <ContactData ingredients={this.state.ingredients} {...this.props} />}
                />
            </div>
        );
    }
}

export default Checkout;
