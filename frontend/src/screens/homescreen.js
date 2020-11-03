import React,{Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/product';
import { connect } from 'react-redux';
import * as actions from '../actions/productActions';
import Message from "../components/message";
import Loader from '../components/loader';
import Paginate from '../components/paginate';

class HomeScreen extends  Component {

    componentDidMount() {
        this.props.onInitProduct(this.props.match.params.keyword,(this.props.match.params.pageNumber || 1));
    }

    componentDidUpdate(prevProps, prevState) {
        if(
            (this.props.match.params.keyword !== prevProps.match.params.keyword) ||
            (this.props.match.params.pageNumber !== prevProps.match.params.pageNumber)
        )
        {
            this.props.onInitProduct(this.props.match.params.keyword,(this.props.match.params.pageNumber || 1));
        }
    }

    render(){
        //const pageNumber = this.props.match.params.pageNumber || 1;

        return (
            <div>
                <h1>Latest Products</h1>
                {this.props.loading
                    ? <Loader />
                    : this.props.error
                        ? <Message variant="danger">{this.props.error}</Message>
                        :
                        <>
                        <Row>
                            {this.props.products.map(product => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                );
                            })}
                        </Row>

                        <Paginate
                            page={this.props.page}
                            pages={this.props.pages}
                            keyword={this.props.match.params.keyword
                                ? this.props.match.params.keyword : '' }
                        />

                        </>
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        products: state.productList.products,
        loading: state.productList.loading,
        error: state.productList.error,
        page: state.productList.page,
        pages: state.productList.pages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProduct : (keyword,pageNumber) => dispatch(actions.listProducts(keyword,pageNumber))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
