import React, {Component} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from '../actions/userActions';

class ProfileScreen extends Component {
    state = {
        name:'',
        email:'',
        password: '',
        confirmPassword:'',
        message: null
    }

    componentDidMount() {
        if(!this.props.userLogin.userInfo){
            this.props.history.push('/login');
        }else{
            if(!this.props.userDetails.user.name || !this.props.userDetails.user){
                this.props.getProfileHandler('profile').then(r=>{
                    this.setState({
                        name: this.props.userDetails.user.name,
                        email: this.props.userDetails.user.email,
                    });
                });
            }else{
                console.log(this.props.userDetails.user);
                this.setState({
                    name: this.props.userDetails.user.name,
                    email: this.props.userDetails.user.email,
                });
            }
        }
    }

    render() {

        const submitHandler = (e) => {
            e.preventDefault();
            if(this.state.password !== this.state.confirmPassword){
                this.setState({
                    message : 'Password do not match!'
                })
            }else{
                this.props.updateProfileHandler({
                    id: this.props.userDetails.user._id,
                    name : this.state.name,
                    email : this.state.email,
                    password : this.state.password
                });
            }
        }

        return (
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>

                    {this.state.message
                    && <Message variant="danger">{this.state.message}</Message>}

                    {this.props.userDetails.error
                    && <Message variant="danger">{this.props.userDetails.error}</Message>}

                    {this.props.updateUserProfile.success
                    && <Message variant="success">Profile Updated</Message>}

                    {this.props.userDetails.loading && <Loader />}
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
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails : state.userDetails,
        userLogin : state.user, // my login state is not userLogin but user
        updateUserProfile : state.userUpdateProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfileHandler : (id) => dispatch(actions.getUserDetails(id)),
        updateProfileHandler : (user) => dispatch(actions.updateUserDetails(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);