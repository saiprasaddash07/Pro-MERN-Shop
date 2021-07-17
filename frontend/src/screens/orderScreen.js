import React, {Component} from 'react';
import {Row,Col,ListGroup,Image,Card,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import {Link} from 'react-router-dom';
import * as actions from '../actions/orderActions';
import Loader from "../components/loader";
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';

class OrderScreen extends Component {

    state = {
        sdkReady : false,
    }

    componentDidMount() {

        if(!this.props.user.userInfo){
            this.props.history.push('/login');
            return;
        }

        let f = 0;

        if((!this.props.orderDetails.order)){
            this.func();
            f = 1;
        }

        if(!f && this.props.orderDetails.order){
            if (!this.props.orderPay.success) {
                this.func();
            }
        }
    }

    addPaypalScript = async () => {
        const {data : clientId} = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=IND`;
        script.async = true;
        script.onLoad = () => {
            this.setState({sdkReady : true}) ;
        };
        document.body.appendChild(script);
    }

    func = () => {
        this.props.gettingAnOrderById(this.props.match.params.id)
            .then(res=>{
                if(!this.props.orderDetails.order.isPaid){
                    if(!window.paypal){
                        this.addPaypalScript().then(r=>{
                            this.setState({sdkReady : true}) ;
                        });
                    } else {
                        this.setState({sdkReady : true}) ;
                    }
                }
            }).catch(e=>{
            console.log('Some error has occurred');
        })
    }

    render() {

        if(!this.props.orderDetails.loading){
            const addDecimals = (x) => (Math.round(x*100)/100).toFixed(2);

            //Calculate Prices
            this.props.orderDetails.order.itemsPrice = addDecimals(this.props.orderDetails.order.orderItems.reduce(
                (acc,item) => acc+item.price * item.qty,0));
        }

        const successPaymentHandler = (paymentResult) => {
            this.props.onPayingOrder(this.props.match.params.id,paymentResult)
                .then(r=>{
                    this.props.gettingAnOrderById(this.props.match.params.id).then(res=>{
                        this.props.onOrderPayResetting();
                    })
                });
        }

        const deliverHandler = () => {
            this.props.onDeliveringOrder(this.props.orderDetails.order)
                .then(r=>{
                    if(this.props.orderDeliver.success){
                        this.props.gettingAnOrderById(this.props.match.params.id).then(res=>{
                            this.props.onOrderDeliverResetting();
                        })
                    }
                });
        }

        return (
            this.props.orderDetails.loading
                ? <Loader />
                : this.props.orderDetails.error
                ? <Message variant='danger'>{this.props.orderDetails.error}</Message>
                :
                <div>
                    <h1>Order {this.props.orderDetails.order._id}</h1>

                    <Row>

                        <Col md={8}>

                            <ListGroup variant="flush">

                                <ListGroup.Item>
                                    <h2>Shipping</h2>

                                    <p><strong>Name: </strong> {this.props.orderDetails.order.user.name} </p>
                                    <p><strong>Email: </strong><a href={`mailto:${this.props.orderDetails.order.user.email}`} style={{"color":"brown"}}>{this.props.orderDetails.order.user.email}</a> </p>

                                    <p>
                                        <strong>Address:</strong>
                                        {this.props.orderDetails.order.shippingAddress.address}, {this.props.orderDetails.order.shippingAddress.city}, {this.props.orderDetails.order.shippingAddress.postalCode}, {this.props.orderDetails.order.shippingAddress.country}
                                    </p>
                                    {
                                        this.props.orderDetails.order.isDelivered
                                            ? <Message variant='success'>
                                                Delivered on {this.props.orderDetails.order.deliveredAt}</Message>
                                            : <Message variant='danger'>
                                                Not Delivered</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {this.props.orderDetails.order.paymentMethod}
                                    </p>
                                    {
                                        this.props.orderDetails.order.isPaid
                                        ? <Message variant='success'>
                                            Paid on {this.props.orderDetails.order.paidAt}</Message>
                                        : <Message variant='danger'>
                                            Not Paid</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {this.props.orderDetails.order.orderItems.length === 0
                                        ? <Message>Your Order Is Empty</Message>
                                        : (<ListGroup variant='flush'>
                                            {this.props.orderDetails.order.orderItems.map((item,index)=>(
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
                                                            <Link to={`/product/${item.product}`} style={{"color":"brown"}}>
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
                                            <Col>${this.props.orderDetails.order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${this.props.orderDetails.order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${this.props.orderDetails.order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${this.props.orderDetails.order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {!this.props.orderDetails.order.isPaid && (
                                        <ListGroup.Item>
                                            {this.props.orderPay.loading && <Loader />}
                                            {!this.state.sdkReady ? <Loader /> : (
                                                <PayPalButton
                                                    amount={this.props.orderDetails.order.totalPrice}
                                                    onSuccess={successPaymentHandler} />
                                            )}
                                        </ListGroup.Item>
                                    )}

                                    {this.props.orderDeliver.loading && <Loader />}

                                    {this.props.user.userInfo
                                        && this.props.user.userInfo.isAdmin
                                        && this.props.orderDetails.order.isPaid
                                        && !this.props.orderDetails.order.isDelivered
                                        && (
                                                <ListGroup.Item>
                                                    <Button
                                                        type="button"
                                                        className="tn btn-block"
                                                        onClick={deliverHandler}
                                                    >
                                                        Mark as delivered
                                                    </Button>
                                                </ListGroup.Item>
                                            )
                                    }

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
        orderDetails : state.orderDetails,
        orderPay : state.orderPay,
        user : state.user,
        orderDeliver : state.orderDeliver,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gettingAnOrderById : (id) => dispatch(actions.getOrderDetails(id)),
        onPayingOrder : (id,res) => dispatch(actions.payOrder(id,res)),
        onOrderPayResetting : () => dispatch(actions.orderReset()),
        onOrderDeliverResetting : () => dispatch(actions.orderDeliverReset()),
        onDeliveringOrder : (order) => dispatch(actions.deliverOrder(order)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderScreen);