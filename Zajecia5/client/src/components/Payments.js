import React, {useState} from 'react';
import axios from 'axios';
import './Payments.css';

const Payments = ({location}) => {
    const [payment, setPayment] = useState({});
    const [sum, setSum] = useState(0);

    const handlePayment = () => {
        console.log("Sending payment data:", payment);
        
        axios.post("http://localhost:8080/payments", JSON.stringify(payment), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log("Payment successful");
        })
        .catch(error => {
            console.error("Error making payment: ", error);
        });
    };

    return (
        <div className="payments-cont">
            <h2>Make Payment</h2>
            <input type="text" placeholder="Card number" onChange={e => setPayment({...payment, cardNumber: e.target.value})} />
            <input type="text" placeholder="Name on card" onChange={e => setPayment({...payment, nameOnCard: e.target.value})} />
            <input type="text" placeholder="Expiry date" onChange={e => setPayment({...payment, expiryDate: e.target.value})} />
            <input type="text" placeholder="CVV" onChange={e => setPayment({...payment, cvv: e.target.value})} />
            <button className="payment-button" onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default Payments;