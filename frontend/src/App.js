import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import HomeScreen from './screens/homescreen';
import ProductScreen from './screens/productScreen';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="py-4">
          <Container>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
