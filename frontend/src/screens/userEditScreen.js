import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from '../actions/userActions';
import FormContainer from '../components/formContainer';

class UserEditScreen extends Component {
    state = {
        name:'',
        email:'',
        isAdmin : false
    }

    componentDidMount() {
        if(!this.props.userDetails.user.name
            || this.props.userDetails.user._id !== this.props.match.params.id
        ){
            this.props.onGettingUserDetails(this.props.match.params.id).then(r=>{
                this.setState({
                    name: this.props.userDetails.user.name,
                    email: this.props.userDetails.user.email,
                    isAdmin : this.props.userDetails.user.isAdmin
                });
            });
        }else{
            this.setState({
                name: this.props.userDetails.user.name,
                email: this.props.userDetails.user.email,
                isAdmin : this.props.userDetails.user.isAdmin
            });
        }
    }

    render() {

        const submitHandler = (e) => {
            e.preventDefault();
            this.props.onUpdatingUser({
                _id : this.props.userDetails.user._id,
                name: this.state.name,
                email : this.state.email,
                isAdmin: this.state.isAdmin
            }).then(r=>{
                if(this.props.userUpdate.success){
                    this.props.onUpdatingUserRequest();
                    this.props.history.push('/admin/userlist');
                }
            });
        }

        return (
            <div>
                <Link to='/admin/userlist' className="btn btn-light my-3">
                    Go Back
                </Link>

                <FormContainer>
                    <h1>Edit User</h1>

                    {this.props.userUpdate.loading
                        && <Loader />}

                    {this.props.userUpdate.error
                        && <Message variant="danger">{this.props.userUpdate.error}</Message>}

                    {this.props.userDetails.loading
                        ? <Loader />
                        : this.props.userDetails.error
                            ? <Message variant="danger">{this.props.userDetails.error}</Message>
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

                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={(e) => this.setState({email:e.target.value})}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="isAdmin">
                                    <Form.Check
                                        type="checkbox"
                                        label="Is admin"
                                        checked={this.state.isAdmin}
                                        onChange={(e) => this.setState({isAdmin:e.target.checked})}>
                                    </Form.Check>
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
        userDetails : state.userDetails,
        userUpdate : state.userUpdate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingUserDetails : (id) => dispatch(actions.getUserDetails(id)),
        onUpdatingUser  : (user) => dispatch(actions.updateUser(user)),
        onUpdatingUserRequest : () => dispatch(actions.updateUserReset())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserEditScreen);