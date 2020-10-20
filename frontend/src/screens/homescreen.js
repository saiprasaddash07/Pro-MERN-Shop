import React,{Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/product';
import { connect } from 'react-redux';
import * as actions from '../actions/productActions';
import Message from "../components/message";
import Loader from "../components/loader";

class HomeScreen extends  Component {

    componentDidMount() {
        this.props.onInitProduct();
    }

    render(){
        return (
            <div>
                <h1>Latest Products</h1>
                {this.props.loading
                    ? <Loader />
                    : this.props.error
                        ? <Message variant="danger">{this.props.error}</Message>
                        :
                        <Row>
                            {this.props.products.map(product => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                );
                            })}
                        </Row>
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        products: state.productList.products,
        loading: state.productList.loading,
        error: state.productList.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProduct : () => dispatch(actions.listProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
