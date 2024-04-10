import React, {useContext} from "react";
import {CartContext} from "../CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";


const Cart = () => {
    const [cartItems, setCartItems] = useContext(CartContext);

    const removeItem = id => {
        const itemInd = cartItems.findIndex(item => item.id === id);
        if (cartItems[itemInd].quantity > 1) {
            const newCartItems = [...cartItems];
            newCartItems[itemInd].quantity -= 1;
            setCartItems(newCartItems);
        } else {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        }
    };

    const calcPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
            {cartItems.length === 0 && <p>Your cart is empty</p>}
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - Price: {item.price} - Quantity: {item.quantity}
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total: {calcPrice()}</p>
            {cartItems.length > 0 && (
                <Link to="/payments">
                    <button className="pay-button">Pay</button>
                </Link>
            )}
        </div>
    );
};

export default Cart;