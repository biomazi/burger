import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate (prevProps, prevState) {
        console.log('didUpdate')
    }
    
    componentWillUpdate (prevProps, prevState) {
        console.log('willUpdate')
    }
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((igKey, i) => {
            return (
                <li key={igKey + i}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });
        return (
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p>
                    <strong>{this.props.price.toFixed(2)}$</strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">
                    Cancel
                </Button>
                <Button clicked={this.props.purchasedContinued} btnType="Success">
                    Continue
                </Button>
            </>
        );
    }
}

export default OrderSummary;
