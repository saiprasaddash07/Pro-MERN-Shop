import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap';
import Rating from '../components/rating';
//import products from '../products';
import axios from "axios";

class ProductScreen extends Component{
    state ={
        product:{}
    }

    componentDidMount() {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/products/${this.props.match.params.id}`);
            this.setState({product:res.data});
        }
        fetchProduct();
    }

    render() {
        console.log(this.state.product);
        //const product = this.state.products.find(p => p._id === this.props.match.params.id);
        return (
            <div>
                <Link className="btn btn-light my-3" to="/">Go Back</Link>
                <Row>
                    <Col md={6}>
                        <Image src={this.state.product.image} alt={this.state.product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{this.state.product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={this.state.product.rating}
                                    text={`${this.state.product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${this.state.product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {this.state.product.description}
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
                                            {this.state.product.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {this.state.product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className="btn-block" type="button" disabled={this.state.product.countInStock === 0}>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };
}

export default ProductScreen;
