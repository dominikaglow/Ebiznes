import './App.css';
import Products from '../src/components/Products';
import Payments from '../src/components/Payments';
import Cart from '../src/components/Cart';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <div className='links'>
            <Link to="/">Products</Link>
            <Link to="/payments">Payments</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <Routes>
            <Route path="/" exact Component={Products} />
            <Route path="/payments" exact Component={Payments} />
            <Route path="/cart" exact Component={Cart} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
