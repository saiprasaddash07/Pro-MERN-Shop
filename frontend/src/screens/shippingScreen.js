import React, {Component} from 'react';
import {Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import FormContainer from '../components/formContainer';
import * as actions from "../actions/cartActions";
import CheckoutSteps  from '../components/checkoutSteps';

class ShippingScreen extends Component {
    state = {
        address : this.props.cart.shippingAddress.address,
        city : this.props.cart.shippingAddress.city,
        postalCode : this.props.cart.shippingAddress.postalCode,
        country : this.props.cart.shippingAddress.country
    }

    render() {
        const submitHandler = (e) => {
            e.preventDefault();
            this.props.onSavingShippingAddress({
                address:this.state.address,
                city:this.state.city,
                postalCode:this.state.postalCode,
                country:this.state.country
            });
            this.props.history.push('/payment');
        }

        return (
            <FormContainer>
                <CheckoutSteps step1 step2 />

                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={this.state.address}
                            required
                            onChange={(e) =>
                                this.setState({address:e.target.value})}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            value={this.state.city}
                            required
                            onChange={(e) =>
                                this.setState({city:e.target.value})}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="postalCode">
                        <Form.Label>PostalCode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Postalcode"
                            value={this.state.postalCode}
                            required
                            onChange={(e) =>
                                this.setState({postalCode:e.target.value})}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            value={this.state.country}
                            required
                            onChange={(e) =>
                                this.setState({country:e.target.value})}>
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Continue
                    </Button>

                </Form>
            </FormContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart : state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSavingShippingAddress : (data) => dispatch(actions.saveShippingAddress(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShippingScreen);