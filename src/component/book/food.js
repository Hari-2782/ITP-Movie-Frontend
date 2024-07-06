import React, { useEffect, useState } from "react";
import { useParams,Link} from 'react-router-dom';
import "./FoodList.css";

const FoodList = () => {
  const { bookingId } = useParams();
  const [foodTypes, setFoodTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await fetch("https://itp-movie-backend.vercel.app/food/getall");
        if (!response.ok) {
          throw new Error("Failed to fetch food types");
        }
        const data = await response.json();
        console.log("Fetched food types:", data);
        setFoodTypes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoodTypes();
  }, []);

  const handleTypeClick = async (type) => {
    try {
      const response = await fetch(`https://itp-movie-backend.vercel.app/food/getitems/${type.toLowerCase().replace(/\s/g, "")}`);
      if (!response.ok) {
        throw new Error("Failed to fetch food items");
      }
      const data = await response.json();
      console.log(`Fetched ${type} items:`, data);
      setItems(data);
      setSelectedType(type);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      if (existingItem.qty < item.quantity) {
        const updatedCart = cart.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
        setCart(updatedCart);
        setTotalAmount(totalAmount + item.price);
      } else {
        alert('Maximum quantity reached');
      }
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
      setTotalAmount(totalAmount + item.price);
    }
  };
  

  const checkout = async () => {
    try {
      const itemsArray = cart.map((item) => ({
        itemId: item._id,
        quantity: item.qty,
        totalprice: item.price * item.qty, // Correctly calculate the total price
    }));
    
        const response = await fetch('https://itp-movie-backend.vercel.app/food/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(itemsArray),
        });

        if (!response.ok) {
            throw new Error("Failed to order food");
        }

        const responseData = await response.json();
        let { foodId } = responseData;


        console.log("Food booked successfully");
        setCart([]); // Clear the cart
        setTotalAmount(0); // Reset the total amount

        // Redirect to the payment page with the foodId in the URL
        window.location.href = `/payment/${bookingId}/${foodId}`;
    } catch (error) {
        console.error(error);
    }
};


  
  
  return (
    <div className="food-list-container">
      <div className="food-types-container">
        {["Food", "Beverage", "Drink", "Snack"].map((type) => (
          <div key={type} className="food-type" onClick={() => handleTypeClick(type)}>
            <h2>{type}</h2>
          </div>
        ))}
      </div>
      <div className="food-items-container">
        {selectedType && (
          
          <div>
            <h2>{selectedType} Items</h2>
            {items.map((item) => (
              <div key={item._id} className="food-item">
                <h3>{item.name}</h3>
                <img src={item.imageurl} alt={item.name} />
                <p>description: {item.description}</p>
                <p>Price: {item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cart-container">
        <h2>Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item.name} - Qty: {item.qty}</p>
          </div>
        ))}
        <p>Total Amount: {totalAmount}</p>
        <button onClick={checkout}>
              Checkout
        </button>
        <button ><Link to={`/payment/${bookingId}/?`}>Skip</Link></button>
      </div>
    </div>
  );
};

export default FoodList;
