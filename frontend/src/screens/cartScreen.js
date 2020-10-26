import React, {Component} from 'react';
import {connect} from 'react-redux';
import Message from "../components/message";
import {Row,Col,ListGroup,Image,Form,Button,Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as actions from "../actions/cartActions";

class CartScreen extends Component {

    componentDidMount() {
        const productId = this.props.match.params.id;

        // it is of the format "?qty=2" and we want only 2
        const qty = this.props.location.search
            ? Number(this.props.location.search.split('=')[1]) : 1 ;

        console.log(productId);
        //console.log(this.props.cart.cartItems);

        if(productId){
            this.props.onAddToCartHandler(productId,qty);
        }
    }

    render() {
        // const qty = this.props.location.search
        //     ? Number(this.props.location.search.split('=')[1]) : 1 ;

        const removeFromCartHandler = (id) =>{
            this.props.onRemoveFromCartHandler(id);
            this.props.history.replace('/cart');
        }

        const addToCart = (id,x) => {
            this.props.onAddToCartHandler(id,x);
            this.props.history.replace(`/cart/${id}?qty=${x}`);
        }

        const checkoutHandler = () => {
            this.props.history.push('/login?redirect=shipping');
        }

        return (
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {this.props.cart.cartItems.length === 0
                        ? <Message> Your Cart Is Empty!
                            { <Link to="/"> Go Back</Link> }
                        </Message> :(
                            <ListGroup variant={"flush"}>
                                {this.props.cart.cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>{item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    // onChange={(e)=>{
                                                    //     this.props.onAddToCartHandler(item.product,Number(e.target.value))
                                                    // }}
                                                    onChange={(e)=> addToCart(item.product,Number(e.target.value)) }
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option
                                                                key={x+1}
                                                                value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type="button"
                                                    variant="light"
                                                    onClick={ () => removeFromCartHandler(item.product)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>Subtotal ({
                                        this.props.cart.cartItems.reduce(
                                            (acc,item) => acc+item.qty , 0)
                                    })
                                    items
                                </h3>
                                ${
                                    this.props.cart.cartItems.reduce(
                                    (acc,item) => acc+item.qty*item.price , 0).toFixed(2)
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={this.props.cart.cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >   Proceed to check out
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        cart : state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCartHandler : (id,qty) => dispatch(actions.addToCart(id,qty)),
        onRemoveFromCartHandler : (id) => dispatch(actions.removeFromCart(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartScreen);