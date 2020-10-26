import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from '../actions/userActions';
import FormContainer from '../components/formContainer';

class LoginScreen extends Component {
    state = {
        email:'',
        password: '',
    }

    render() {

        const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
        console.log(this.props);

        if(this.props.user.userInfo){
            this.props.history.push(redirect);
        }

        const submitHandler = (e) => {
            e.preventDefault();
            this.props.onLoginHandler(this.state.email,this.state.password);
        }

        return (
            <FormContainer>
                <h1>Sign In</h1>
                {this.props.user.error
                    && <Message variant="danger">{this.props.user.error}</Message>}
                {this.props.user.loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={(e) => this.setState({email:e.target.value})}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={(e) => this.setState({password:e.target.value})}>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="py-2">
                        Sign In
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer?
                        <Link
                            to={ redirect
                                ? `/register?redirect=${redirect}`
                                : '/register' }> Register
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginHandler : (email,password) => dispatch(actions.login(email,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);