import React, {Component} from 'react';
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import * as actions from "../actions/cartActions";
import CheckoutSteps  from '../components/checkoutSteps';
import {Link} from 'react-router-dom';

class PlaceOrderScreen extends Component {

    render() {

        const addDecimals = (x) => (Math.round(x*100)/100).toFixed(2);

        //Calculate Prices
        this.props.cart.itemsPrice = addDecimals(this.props.cart.cartItems.reduce(
            (acc,item) => acc+item.price * item.qty,0));

        this.props.cart.shippingPrice = addDecimals(this.props.cart.itemsPrice > 100 ? 0 : 80) ;

        this.props.cart.taxPrice = addDecimals(Number((this.props.cart.itemsPrice * 0.15).toFixed(2) )) ;

        this.props.cart.totalPrice = addDecimals((
            Number(this.props.cart.itemsPrice) +
            Number(this.props.cart.shippingPrice) +
            Number(this.props.cart.taxPrice)
        ).toFixed(2));


        const placeOrderHandler = () => {

        }

        return (
            <div>
                <CheckoutSteps step1 step2 step3 step4 />
                <Row>

                    <Col md={8}>

                        <ListGroup variant="flush">

                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address:</strong>
                                    {this.props.cart.shippingAddress.address}, {this.props.cart.shippingAddress.city}, {this.props.cart.shippingAddress.postalCode}, {this.props.cart.shippingAddress.country}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {this.props.cart.paymentMethod.paymentMethod}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {this.props.cart.cartItems.length === 0
                                    ? <Message>Your Cart Is Empty</Message>
                                    : (<ListGroup variant='flush'>
                                        {this.props.cart.cartItems.map((item,index)=>(
                                            <ListGroup.Item key={index}>

                                                <Row>

                                                    <Col md={1}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded>
                                                        </Image>
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </Col>

                                                </Row>

                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>)
                                }
                            </ListGroup.Item>

                        </ListGroup>

                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>

                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${this.props.cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${this.props.cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${this.props.cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${this.props.cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn-block"
                                        disabled={this.props.cart.cartItems.length === 0}
                                        onClick={placeOrderHandler}
                                    >
                                        Place Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                </Row>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart : state.cart
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onSavingShippingAddress : (data) => dispatch(actions.saveShippingAddress(data))
//     }
// }

export default connect(mapStateToProps)(PlaceOrderScreen);