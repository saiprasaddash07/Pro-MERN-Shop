import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from "../actions/userActions";

class UserListScreen extends Component {

    componentDidMount() {
        if(this.props.user.userInfo && this.props.user.userInfo.isAdmin){
            this.props.onGettingAllTheUsers();
        }else{
            this.props.history.push('/login');
        }
    }

    render() {
        const deleteHandler = (id) => {
            if(window.confirm('Are you sure you want to delete!')){
                this.props.onDeletingUser(id).then(r=>{
                    if(this.props.userDelete.success){
                        if(this.props.user.userInfo && this.props.user.userInfo.isAdmin){
                            this.props.onGettingAllTheUsers();
                        }else{
                            this.props.history.push('/login');
                        }
                    }
                });
            }
        }

        return (
            <div>
                <h1>Users</h1>
                {
                    this.props.userList.loading
                        ? <Loader/>
                        : this.props.userList.error
                            ? <Message variant="danger">
                                {this.props.userList.error}
                              </Message>
                            : (
                                <Table striped bordered hover responsive className="table-sm">

                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {this.props.userList.users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                                <td>
                                                    {user.isAdmin
                                                        ? (<i
                                                            className="fas fa-check"
                                                            style={{"color":"green"}}>
                                                          </i>)
                                                        : <i
                                                            className="fas fa-times"
                                                            style={{"color":"red"}}>
                                                        </i>
                                                    }
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                                        <Button variant="light" className="btn-sm">
                                                            <i className="fas fa-edit"></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button
                                                        variant="danger"
                                                        className="btn-sm"
                                                        onClick={()=>deleteHandler(user._id)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </Table>
                            )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userList : state.userList,
        user: state.user,
        userDelete : state.userDelete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingAllTheUsers : () => dispatch(actions.listUsers()),
        onDeletingUser : (id) => dispatch(actions.deleteUser(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserListScreen);