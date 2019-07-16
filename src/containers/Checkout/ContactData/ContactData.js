import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState(() => {
            return { loading: true };
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.location.state.totalPrice,
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
                    return { loading: false };
                });
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState(() => {
                    return { loading: false };
                });
            });
    };

    render() {
        let form = (
            <form action="">
                <input type="text" name="name" id="" placeholder="Your Name" />
                <input type="email" name="email" id="" placeholder="Your Mail" />
                <input type="address" name="street" id="" placeholder="Street" />
                <input type="address" name="postalCode" id="" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data: </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
