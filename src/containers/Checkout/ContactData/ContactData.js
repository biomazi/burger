import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		}
	}

	render () {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data: </h4>
				<form action="">
					<input type="text" name="name" id="" placeholder="Your Name" />
					<input type="email" name="email" id="" placeholder="Your Mail" />
					<input type="address" name="street" id="" placeholder="Street" />
					<input type="address" name="postalCode" id="" placeholder="Postal Code" />
					<Button btnType="Success">ORDER</Button>
				</form>
			</div>
		)
	}
}

export default ContactData