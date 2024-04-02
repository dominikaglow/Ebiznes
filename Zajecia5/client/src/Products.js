import React, {useState, useEffect} from "react";
import axios from 'axios';
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <div className="products-cont">
            <h2>Products</h2>
            <ul>
                {products.map(prod =>(
                    <li key={prod.id}>
                        {prod.name} - Price: {prod.price}
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Products;
