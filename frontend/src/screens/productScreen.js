import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Image,Form } from 'react-bootstrap';
import Rating from '../components/rating';
import { connect } from 'react-redux';
import * as actions from "../actions/productActions";
import Loader from "../components/loader";
import Message from "../components/message";
import MetaComponent from "../components/meta";
import AdComponent from "../components/adComponent"

class ProductScreen extends Component{

    state = {
        qty : 1,
        rating : 0,
        comment : ''
    }

    componentDidMount() {
        this.props.onInitProduct(this.props.match.params.id);
    };

    render() {

        const submitHandler = (e) => {
            e.preventDefault();
            this.props.onCreatingNewProductReview(this.props.match.params.id,{
                rating : this.state.rating,
                comment : this.state.comment
            }).then(r=>{
                if(this.props.successProductReview){
                    alert('Review Submitted');
                    this.setState({rating:0,comment:''});
                    this.props.onResettingReview();
                    this.props.onInitProduct(this.props.match.params.id);
                }else if(this.props.errorProductReview){
                    this.props.onResettingReview();
                }
            })
        }

        const addToCartHandler = () => {
            this.props.history.push(`/cart/${this.props.match.params.id}?qty=${this.state.qty}`);
        }

        console.log(this.props.product);
        //const product = this.state.products.find(p => p._id === this.props.match.params.id);
        return (
            <div>
                <AdComponent />
                <Link className="btn btn-light my-3" to="/">Go Back</Link>
                {this.props.loading
                    ? <Loader />
                    : this.props.error
                        ? <Message variant="danger">{this.props.error}</Message>
                        :  (
                          <div>

                              <MetaComponent title={this.props.product.title} />

                            <Row>
                                <Col md={6}>
                                    <Image src={this.props.product.image} alt={this.props.product.name} fluid />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{this.props.product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating
                                                value={this.props.product.rating}
                                                text={`${this.props.product.numReviews} reviews`}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${this.props.product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Description: {this.props.product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Price:
                                                    </Col>
                                                    <Col>
                                                        {this.props.product.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        {this.props.product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {this.props.product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>
                                                            Qty
                                                        </Col>
                                                        <Col>
                                                            <Form.Control
                                                                as="select"
                                                                value={this.state.qty}
                                                                onChange={(e)=>{
                                                                    this.setState({qty:e.target.value})
                                                                }}
                                                            >
                                                                {
                                                                    [...Array(this.props.product.countInStock).keys()].map(x => (
                                                                    <option
                                                                        key={x+1}
                                                                        value={x+1}>
                                                                        {x+1}
                                                                    </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button
                                                    className="btn-block"
                                                    type="button"
                                                    disabled={this.props.product.countInStock === 0}
                                                    onClick={addToCartHandler}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h2>Reviews</h2>
                                    {this.props.product.reviews.length === 0
                                        && <Message>No Reviews</Message>
                                    }
                                    <ListGroup variant="flush">
                                        {this.props.product.reviews.map(review => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p>{review.createdAt.substring(0,10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <h2>Write a customer Review</h2>
                                            {this.props.errorProductReview
                                                && <Message variant="danger">{this.props.errorProductReview}</Message>}
                                            {this.props.userInfo
                                                ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Rating</Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={this.state.rating}
                                                                onChange={(e) =>
                                                                    this.setState({rating:e.target.value})}
                                                            >
                                                                <option value=''>Select...</option>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Comment</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                row='3'
                                                                value={this.state.comment}
                                                                onChange={(e) =>
                                                                    this.setState({comment:e.target.value})}
                                                            ></Form.Control>
                                                        </Form.Group>
                                                        <Button type='submit' variant='primary'>
                                                            Submit
                                                        </Button>
                                                    </Form>
                                                )
                                                : <Message>Please
                                                    <Link to="/login" style={{"color":"red"}}> sign in </Link>
                                                    to write a review
                                                </Message>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                          </div>
                        )};
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        product: state.productDetails.product,
        loading: state.productDetails.loading,
        error: state.productDetails.error,
        errorProductReview : state.productReviewCreate.error,
        successProductReview : state.productReviewCreate.success,
        userInfo : state.user.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProduct : (id) => dispatch(actions.listProductDetails(id)),
        onCreatingNewProductReview : (id,review) => dispatch(actions.createProductReview(id,review)),
        onResettingReview : () => dispatch(actions.resetProductReview())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductScreen);
