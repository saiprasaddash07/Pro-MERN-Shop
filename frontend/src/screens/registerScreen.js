import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from '../actions/userActions';
import FormContainer from '../components/formContainer';

class RegisterScreen extends Component {
    state = {
        name:'',
        email:'',
        password: '',
        confirmPassword:'',
        message: null
    }

    render() {

        const redirect = this.props.location.search ? this.props.location.search.split('=')[1] : '/';
        console.log(this.props);

        if(this.props.user.userInfo){
            this.props.history.push(redirect);
        }

        const submitHandler = (e) => {
            e.preventDefault();
            if(this.state.password !== this.state.confirmPassword){
                this.setState({
                    message : 'Password do not match!'
                })
            }else{
                this.props.onRegisterHandler(this.state.name,this.state.email,this.state.password);
            }
        }

        return (
            <FormContainer>
                <h1>Sign Up</h1>

                {this.state.message
                && <Message variant="danger">{this.state.message}</Message>}

                {this.props.user.error
                && <Message variant="danger">{this.props.user.error}</Message>}

                {this.props.user.loading && <Loader />}
                <Form onSubmit={submitHandler}>

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
                            onChange={(e) =>
                                this.setState({password:e.target.value})}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={(e) =>
                                this.setState({confirmPassword:e.target.value})}>
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="py-2">
                        Register
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Have an Account?
                        <Link
                            to={ redirect
                                ? `/login?redirect=${redirect}`
                                : '/login' }> Login
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.userRegister
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRegisterHandler : (name,email,password) => dispatch(actions.register(name,email,password)),
        onLoginHandler : (email,password) => dispatch(actions.login(email,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterScreen);