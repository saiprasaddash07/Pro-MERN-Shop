import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap';
import Rating from '../components/rating';
import { connect } from 'react-redux';
import * as actions from "../actions/productActions";
import Loader from "../components/loader";
import Message from "../components/message";

class ProductScreen extends Component{

    componentDidMount() {
        // const fetchProduct = async () => {
        //     const res = await axios.get(`/api/products/${this.props.match.params.id}`);
        //     this.setState({product:res.data});
        // }
        // fetchProduct();
        this.props.onInitProduct(this.props.match.params.id);
    }

    render() {
        console.log(this.props.product);
        //const product = this.state.products.find(p => p._id === this.props.match.params.id);
        return (
            <div>
                <Link className="btn btn-light my-3" to="/">Go Back</Link>
                {this.props.loading
                    ? <Loader />
                    : this.props.error
                        ? <Message variant="danger">{this.props.error}</Message>
                        :  <Row>
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
                                        <ListGroup.Item>
                                            <Button className="btn-block" type="button" disabled={this.props.product.countInStock === 0}>
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                };
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        product: state.productDetails.product,
        loading: state.productDetails.loading,
        error: state.productDetails.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProduct : (id) => dispatch(actions.listProductDetails(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductScreen);
