import React, {Component} from 'react';
import {Form,Button,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import FormContainer from '../components/formContainer';
import * as actions from "../actions/cartActions";
import CheckoutSteps  from '../components/checkoutSteps';

class PaymentScreen extends Component {
    state = {
        address : this.props.cart.shippingAddress.address,
        city : this.props.cart.shippingAddress.city,
        postalCode : this.props.cart.shippingAddress.postalCode,
        country : this.props.cart.shippingAddress.country,
        paymentMethod : 'PayPal'
    }

    render() {

        if(!this.props.cart.shippingAddress){
            this.props.history.push('/shipping');
        }

        const submitHandler = (e) => {
            e.preventDefault();
            this.props.onSavingPaymentMethod({
                paymentMethod: this.state.paymentMethod
            });
            this.props.history.push('/placeorder');
        }

        return (
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />

                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group>
                        <Form.Label as='legend'>
                            Select Method
                        </Form.Label>

                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => this.setState({paymentMethod:e.target.value})}
                            >
                            </Form.Check>
                        </Col>
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
        onSavingPaymentMethod : (data) => dispatch(actions.savePaymentMethod(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PaymentScreen);