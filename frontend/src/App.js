import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import HomeScreen from './screens/homescreen';
import ProductScreen from './screens/productScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import ProfileScreen from './screens/profileScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/paymentScreen';
import PlaceOrderScreen from './screens/placeOrderScreen';
import OrderScreen from './screens/orderScreen';
import UserListScreen from './screens/userListScreen';
import UserEditScreen from './screens/userEditScreen';
import ProductListScreen from "./screens/productListScreen";
import ProductEditScreen from './screens/productEditScreen';
import OrderListScreen from './screens/orderListScreen';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="py-4">
          <Container>
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
            <Route path="/admin/productlist" exact component={ProductListScreen} />
            <Route path="/admin/productlist/:pageNumber" exact component={ProductListScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/search/:keyword" exact component={HomeScreen} />
            <Route path="/page/:pageNumber" exact component={HomeScreen} />
            <Route path="/search/:keyword/page/:pageNumber" exact component={HomeScreen} />
            <Route path="/" exact component={HomeScreen} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
