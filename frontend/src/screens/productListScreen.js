import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table,Button,Row,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from "../actions/productActions";
import Paginate from '../components/paginate';

class ProductListScreen extends Component {

    componentDidMount() {
        if(this.props.user.userInfo && this.props.user.userInfo.isAdmin){
            this.props.onGettingAllTheProducts('',this.props.match.params.pageNumber);
        }else{
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.pageNumber !== this.props.match.params.pageNumber){
            if(this.props.user.userInfo && this.props.user.userInfo.isAdmin){
                this.props.onGettingAllTheProducts('',this.props.match.params.pageNumber);
            }else{
                this.props.history.push('/login');
            }
        }
    }

    render() {
        const deleteHandler = (id) => {
            if(window.confirm('Are you sure you want to delete!')){
                this.props.onDeletingProduct(id).then(r=>{
                    if(this.props.productDelete.success){
                        if(this.props.user.userInfo && this.props.user.userInfo.isAdmin){
                            this.props.onGettingAllTheProducts('',this.props.match.params.pageNumber);
                        }else{
                            this.props.history.push('/login');
                        }
                    }
                });
            }
        }

        const createProductHandler = () => {
            this.props.onCreatingProduct()
                .then(r=>{
                if(this.props.productCreate.success){
                    this.props.history.push
                        (`/admin/product/${this.props.productCreate.product.createdProduct._id}/edit`);
                    this.props.onResettingProduct();
                }
            });
        }

        return (
            <div>
                <Row className="align-items-center">
                    <Col>
                        <h1>Products</h1>
                    </Col>
                    <Col className="text-right">
                        <Button
                             className="my-3"
                             onClick={createProductHandler}
                        >
                           <i className="fas fa-plus"></i> Create Product
                        </Button>
                    </Col>
                </Row>

                {this.props.productDelete.loading && <Loader /> }
                {
                    this.props.productDelete.error &&
                        <Message variant="danger">
                            {this.props.productDelete.error}
                        </Message>
                }

                {this.props.productCreate.loading && <Loader /> }
                {
                    this.props.productCreate.error &&
                    <Message variant="danger">
                        {this.props.productCreate.error}
                    </Message>
                }

                {
                    this.props.productList.loading
                        ? <Loader/>
                        : this.props.productList.error
                        ? <Message variant="danger">
                            {this.props.productList.error}
                        </Message>
                        : (
                            <>
                                <Table striped bordered hover responsive className="table-sm">

                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {this.props.productList.products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant="light" className="btn-sm">
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button
                                                    variant="danger"
                                                    className="btn-sm"
                                                    onClick={()=>deleteHandler(product._id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                </Table>

                                <Paginate
                                    pages={this.props.productList.pages}
                                    page={this.props.productList.page}
                                    isAdmin={true}
                                />
                            </>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productList : state.productList,
        productDelete : state.productDelete,
        user: state.user,
        productCreate : state.productCreate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingAllTheProducts : (keyword,pageNumber) => dispatch(actions.listProducts(keyword,pageNumber)),
        onDeletingProduct : (id) => dispatch(actions.deleteProduct(id)),
        onCreatingProduct : () => dispatch(actions.createProduct()),
        onResettingProduct : () => dispatch(actions.resettingProduct())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListScreen);