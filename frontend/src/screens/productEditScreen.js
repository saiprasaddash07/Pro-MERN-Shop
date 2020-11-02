import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from '../actions/productActions';
import axios from 'axios';
import FormContainer from '../components/formContainer';

class ProductEditScreen extends Component {
    state = {
        name:'',
        price:0,
        image : '',
        brand : '',
        description :'',
        category : '',
        countInStock :0,
        uploading : false
    }

    componentDidMount() {
        if(!this.props.productDetails.product.name
            || this.props.productDetails.product._id !== this.props.match.params.id
        ){
            this.props.onGettingProductDetails(this.props.match.params.id).then(r=>{
                this.setState({
                    name: this.props.productDetails.product.name,
                    price: this.props.productDetails.product.price,
                    image : this.props.productDetails.product.image,
                    brand: this.props.productDetails.product.brand,
                    description: this.props.productDetails.product.description,
                    category: this.props.productDetails.product.category,
                    countInStock: this.props.productDetails.product.countInStock,
                });
            });
        }else{
            this.setState({
                name: this.props.productDetails.product.name,
                price: this.props.productDetails.product.price,
                image : this.props.productDetails.product.image,
                brand: this.props.productDetails.product.brand,
                description: this.props.productDetails.product.description,
                category: this.props.productDetails.product.category,
                countInStock: this.props.productDetails.product.countInStock,
            });
        }
    }

    render() {

        const submitHandler = (e) => {
            e.preventDefault();
            console.log("submit");
            console.log(this.state.image);
            this.props.onUpdatingProduct({
                _id : this.props.productDetails.product._id,
                name: this.state.name,
                price: this.state.price,
                image : this.state.image,
                brand: this.state.brand,
                description: this.state.description,
                category: this.state.category,
                countInStock: this.state.countInStock,
            }).then(r=>{
                if(this.props.productUpdate.success){
                    this.props.onResettingProduct();
                    this.props.history.push('/admin/productlist');
                }
            });
        }

        const uploadFileHandler = async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image',file);
            this.setState({uploading:true});

            try {
                const config = {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }

                let { data } = await axios.post('/api/upload',formData,config);

                if(data.startsWith('/frontend')){
                    data = data.replace('/frontend/public','');
                }

                this.setState({image:data});
                this.setState({uploading:false});
            }catch (error) {
                console.error(error);
                this.setState({uploading:false});
            }
        }

        return (
            <div>
                <Link to='/admin/productlist' className="btn btn-light my-3">
                    Go Back
                </Link>

                <FormContainer>
                    <h1>Edit Product</h1>

                    {this.props.productUpdate.loading
                        && <Loader />
                    }
                    {this.props.productUpdate.error
                        && <Message variant="danger">{this.props.productUpdate.error}</Message>
                    }

                    {this.props.productDetails.loading
                        ? <Loader />
                        : this.props.productDetails.error
                            ? <Message variant="danger">{this.props.productDetails.error}</Message>
                            : ( <Form onSubmit={submitHandler}>

                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="name"
                                            placeholder="Enter name"
                                            value={this.state.name}
                                            onChange={(e) =>
                                                this.setState({name:e.target.value})}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter price"
                                            value={this.state.price}
                                            onChange={(e) => this.setState({price:e.target.value})}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="image">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter image url"
                                            value={this.state.image}
                                            onChange={(e) => this.setState({image:e.target.value})}>
                                        </Form.Control>
                                        <Form.File
                                            id="image-file"
                                            label="Choose file"
                                            custom
                                            onChange={uploadFileHandler}
                                        ></Form.File>
                                        {this.state.uploading && <Loader />}
                                    </Form.Group>

                                    <Form.Group controlId="brand">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter brand"
                                            value={this.state.brand}
                                            onChange={(e) => this.setState({brand:e.target.value})}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="countInStock">
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter countInStock"
                                            value={this.state.countInStock}
                                            onChange={(e) => this.setState({countInStock:e.target.value})}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter category"
                                            value={this.state.category}
                                            onChange={(e) => this.setState({category:e.target.value})}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter description"
                                            value={this.state.description}
                                            onChange={(e) => this.setState({description:e.target.value})}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Button type="submit" variant="primary" className="py-2">
                                        Update
                                    </Button>
                                </Form>
                            )
                    }
                </FormContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productDetails : state.productDetails,
        productUpdate : state.productUpdate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingProductDetails : (id) => dispatch(actions.listProductDetails(id)),
        onUpdatingProduct : (product) => dispatch(actions.updateProduct(product)),
        onResettingProduct : () => dispatch(actions.resettingProductAfterUpdating())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductEditScreen);