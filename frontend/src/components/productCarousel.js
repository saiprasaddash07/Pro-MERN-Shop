import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Carousel,Image} from 'react-bootstrap';
import Loader from './loader';
import Message from './message';
import * as actions from '../actions/productActions';
import {connect} from 'react-redux';

class ProductCarousel extends Component {

    componentDidMount() {
        this.props.onGettingTheTopProducts();
    }

    render() {
        return (
            <div>
                {this.props.productTopRated.loading
                    ? <Loader />
                    : this.props.productTopRated.error
                        ? <Message variant="danger">{this.props.productTopRated.error}</Message>
                        : (
                            <Carousel pause="hover" className="bg-dark">
                                {this.props.productTopRated.products.map(product => (
                                    <Carousel.Item key={product._id}>
                                        <Link to={`/product/${product._id}`}>
                                            <Image src={product.image} alt={product.name} fluid></Image>
                                            <Carousel.Caption className="carousel-caption">
                                                <h2>
                                                    {product.name} (${product.price})
                                                </h2>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productTopRated : state.productTopRated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingTheTopProducts : () => dispatch(actions.listTopProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductCarousel);