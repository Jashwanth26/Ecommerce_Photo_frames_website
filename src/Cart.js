import React, { useState, useEffect } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3006/AddToCart", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        if (Array.isArray(resp)) {
          setCart(resp.map(item => ({
            ...item,
            quantity: item.quantity || 1 // Default to 1 if quantity is undefined
          })));
        } else {
          console.error("Unexpected response format:", resp);
          setCart([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        setError("Failed to load cart data.");
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (id, increment) => {
    setCart(cart.map(item => 
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + increment) }
        : item
    ));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3006/AddToCart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCart(cart.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (cart.length === 0) {
    return <p>No items in the cart</p>;
  }

  return (
    <div className="cart-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="product-info">
                  <img src={item.image1} alt={item.heading1} />
                  <span>{item.heading1}</span>
                </div>
              </td>
              <td><i class="fa-solid fa-indian-rupee-sign"></i>{item.price}</td>
              <td>
                <div className="quantity-control">
                  <button 
                    className="minus-btn" 
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="plus-btn" 
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                <button className="buy-btn">Buy Now</button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
