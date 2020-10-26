import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import HomeScreen from './screens/homescreen';
import ProductScreen from './screens/productScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="py-4">
          <Container>
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact component={HomeScreen} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
