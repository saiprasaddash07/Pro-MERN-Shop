import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Message from '../components/message';
import Loader from "../components/loader";
import * as actions from "../actions/orderActions";

class OrderListScreen extends Component {

    componentDidMount() {
        if(this.props.user.userInfo && this.props.user.userInfo.isAdmin){
            this.props.onGettingAllTheOrders();
        }else{
            this.props.history.push('/login');
        }
    }

    render() {

        return (
            <div>
                <h1>Orders</h1>
                {
                    this.props.orderList.loading
                        ? <Loader/>
                        : this.props.orderList.error
                        ? <Message variant="danger">
                            {this.props.orderList.error}
                        </Message>
                        : (
                            <Table striped bordered hover responsive className="table-sm">

                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {this.props.orderList.orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>
                                            {order.createdAt.substring(0,10)}
                                        </td>
                                        <td>
                                            ${order.totalPrice}
                                        </td>
                                        <td>
                                            {order.isPaid
                                                ? (
                                                    order.paidAt.substring(0,10)
                                                )
                                                : <i
                                                    className="fas fa-times"
                                                    style={{"color":"red"}}>
                                                </i>
                                            }
                                        </td>
                                        <td>
                                            {order.isDelivered
                                                ? (
                                                    order.deliveredAt.substring(0,10)
                                                )
                                                : <i
                                                    className="fas fa-times"
                                                    style={{"color":"red"}}>
                                                </i>
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant="light" className="btn-sm">
                                                    Details
                                                </Button>
                                            </LinkContainer>
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
        orderList : state.orderList,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingAllTheOrders : () => dispatch(actions.listOrders()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderListScreen);