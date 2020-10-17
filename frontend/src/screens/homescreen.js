import React,{Component} from 'react';
import { Row, Col } from 'react-bootstrap';

//import products from '../products';
import Product from '../components/product';
import axios from 'axios';

class HomeScreen extends  Component {

    state ={
        products:[]
    }

    componentDidMount() {
        axios.get('/api/products').then(res=>{
            this.setState({products:res.data});
        }).catch(e =>{
            console.log("Some error");
        });
    }

    render(){
        return (
            <div>
                <h1>Latest Products</h1>
                <Row>
                    {this.state.products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
};

export default HomeScreen;
