import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import "./Products.css";
import { CartContext } from "../CartContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useContext(CartContext);

    useEffect(() => {
        axios.get("http://localhost:8080/products")
            .then(response => {
                setProducts(response.data);
                console.log("Success");
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const addToCart = product => {
        const isInCart = cartItems.findIndex(item => item.id === product.id);

        if (isInCart !== -1) {
            const newCartItems = [...cartItems];
            newCartItems[isInCart].quantity += 1;
            setCartItems(newCartItems);
        } else {
            setCartItems(prevItems => [...prevItems, {...product, quantity: 1}]);
        }
    }

    return (
        <div className="products-cont">
            <h2>Products</h2>
            <ul>
                {products.map(prod =>(
                    <li key={prod.id}>
                        <div className="product">
                            {prod.name} - Price: {prod.price}
                        </div>
                        <button onClick={() => addToCart(prod)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Products;
