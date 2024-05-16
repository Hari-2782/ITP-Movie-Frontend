import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PaymentPage.css'; // Import your CSS file for styling

const PaymentPage = () => {
    const { offerId } = useParams();
    const { bookingId, foodId } = useParams();

    const [booking, setBooking] = useState(null);
    const [food, setFood] = useState(null);
    const [offer, setOffer] = useState(null);
    const [loyaltyPoints, setLoyaltyPoints] = useState();
    const [paymentType, setPaymentType] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [offerc, setOfferc] = useState(null);
    const getUser = async () => {
        fetch('http://localhost:8000/user/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((response) => {
                setLoyaltyPoints(response.data.loyaltyPoints);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getBooking = async () => {
        if (bookingId) {
            fetch(`http://localhost:8000/booking/getbooking/${bookingId}`)
                .then(response => response.json())
                .then(data => setBooking(data))
                .catch(error => console.error('Error fetching booking:', error));
        }
    };

    const getFood = async () => {
        if (foodId) {
            fetch(`http://localhost:8000/food/get/${foodId}`)
                .then(response => response.json())
                .then(data => setFood(data))
                .catch(error => console.error('Error fetching food:', error));
        }
    };

    const getOffer = async () => {
        if (offerId) {
            fetch(`http://localhost:8000/offer/get/${offerId}`)
                .then(res => res.json())
                .then((response) => {
                    setOffer(response.data);
                })
                .catch(error => console.error('Error fetching offer:', error));
        }
    };

    useEffect(() => {
        getBooking();
        getFood();
        getOffer();
        getUser();
    }, [bookingId, foodId, offerId]);

    const calculateTotalPrice = () => {
        if (booking && food) {
            return food.totalprice + booking.data.totalPrice;
        }
        if (booking) {
            return booking.data.totalPrice;
        }
        return 0;
    };
    const handlePackage = () => {
        fetch(`http://localhost:8000/offer/active/${offerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Offer activated successfully:', data);
                window.location.href = '/slip'
            })
            .catch(error => console.error('Error activating offer:', error));
    };
    const handlePayment = () => {
        let total = calculateTotalPrice();
        if (paymentType === 'Loyalty Points') {
            if (loyaltyPoints < total) {
                total -= loyaltyPoints;
                setLoyaltyPoints(0);
            }
            else if (loyaltyPoints > total) {
            total -= 500;
            setLoyaltyPoints(loyaltyPoints-500);
        }
        }
        if (paymentType === 'Package' && offerc) {
            total = total - total * (offerc.discount/100);
            
        }
        fetch('http://localhost:8000/payment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                Totalamount: total,
                paymentType: paymentMethod,
                bookingId: bookingId,
                foodId: foodId,
                loyaltyPoints: loyaltyPoints,
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    fetch(`http://localhost:8000/food/update/${foodId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            totalprice: 0
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log('Food total price updated successfully:', data);
                        })
                        .catch(error => console.error('Error updating food total price:', error));
                        if(paymentMethod){
                            window.location.href = '/slip';
                        }
                        else{ window.location.href = '/slip';}
                } else {
                    console.error('Payment failed:', response.error);
                }
            })
            .catch(err => console.error('Error processing payment:', err));
            
    };

    const validateCoupon = async () => {
        try{
        const res=await fetch(`http://localhost:8000/offer/op`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ couponCode }),
            credentials: 'include'
        })
        const data = await res.json();
        if (data.ok) {
                    setOfferc(data.data);
                    setCouponError('');
                } else {
                    setCouponError(data.message || 'Invalid coupon code');
                }
            }
             catch(error) {
                setCouponError('Error validating coupon code');
                console.error('Error validating coupon code:', error);
            };
    };
    
    return (
        <div className="payment-container">
            {offer && (
                <div>
                    <h3>Offer Details</h3>
                    <p>Offer name: {offer.name}</p>
                    <p>Offer Price: {offer.price}</p>

                    <div className="payment-methods">
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="PayPal">PayPal</option>
                            <option value="PaymentSlip">PaymentSlip</option>
                        </select>
                    </div>
                    <button onClick={handlePackage}>Proceed to Payment</button>
                </div>
            )}

            {booking && food && (
                <div>
                    <h3>Booking Details</h3>
                    <p>Booking Total Price: {booking.data.totalPrice}</p>
                    <h3>Food Details</h3>
                    <p>Food Total Price: {food.totalprice}</p>
                    <p>Total Price: {calculateTotalPrice()}</p>

                    <div className="payment-options">
                        <label>
                            <input
                                type="radio"
                                value="Loyalty Points"
                                checked={paymentType === 'Loyalty Points'}
                                onChange={() => setPaymentType('Loyalty Points')}
                            />
                            Use Loyalty Points
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="Package"
                                checked={paymentType === 'Package'}
                                onChange={() => setPaymentType('Package')}
                            />
                            Use Package
                        </label>
                    </div>

                    <div className="payment-methods">
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="PayPal" >PayPal</option>
                            <option value="PaymentSlip">paymentslip</option>
                        </select>
                    </div>
                    <div className="coupon-validation">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={validateCoupon}>Apply Coupon</button>
                {couponError && <p className="error-message">{couponError}</p>}
            </div>
                    <button onClick={handlePayment}>Proceed to Payment</button>
                </div>
            )}

           
        </div>
    );
};

export default PaymentPage;
