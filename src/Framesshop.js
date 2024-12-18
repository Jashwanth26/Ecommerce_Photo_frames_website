import React, { useEffect, useState } from "react";
import arrowImage from './arrow@2x.png';
import { Username } from "./User";
import { useNavigate } from "react-router-dom";

function Frames() {
  const [data, setData] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3006/FramesData", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((resp) => {
        setData(resp);
      })
      .catch(() => {
        alert("error");
      });

    // Fetch cart count initially
    fetch("http://localhost:3006/AddToCart")
      .then((res) => res.json())
      .then((resp) => {
        setCartCount(resp.length); // Assuming the response is an array of cart items
      });
  }, []);

  const addToCart = (id) => {
    fetch("http://localhost:3006/FramesData/" + id, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((resp) => {
        fetch("http://localhost:3006/AddToCart", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(resp)
        }).then(() => {
          alert("Added to cart");
          setCartCount(cartCount + 1); // Update cart count
        }).catch(() => {
          alert("error");
        });
      });
  }


  const navigate = useNavigate();
  const changePath = () => {
    navigate("/cart");
  };

  return (
    <div>
      <div className="framescont">
        <div className="framescard">
          <div className="framescard-title">
            <div className="headersec">
              <span className="heading1">FRAME YOUR PHOTO</span>
              <span className="heading">PHOTO FRAMES</span>
              <span className="heading2">
                <i className="fa-regular fa-user"><Username /></i>
                <i className="fa-solid fa-magnifying-glass"></i>
                <div className="cart-icon" onClick={changePath}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </div>
              </span>
            </div>
          </div>
          <div className="framescard-body">
            <p>Simple Process</p>
            <div className="body1">
              <span className="circle1">Select Frame </span>
              <span className="arrow"><img src={arrowImage} alt="arrow" /></span>
              <span className="circle2">Upload photo</span>
              <span className="arrow"><img src={arrowImage} alt="arrow" /></span>
              <span className="circle3">Buy Frame</span>
            </div>
          </div>
          <div className="selectframes">
            <p className="para">Select Frames by Sizes</p>
            <div className="choosesize">
              {data.map((item) => (
                <div className="size1" key={item.id}>
                  <img src={item.image1} alt={item.heading1} />
                  <span className="info">
                    <h6 className="heading1">{item.heading1}</h6>
                    <p className="para1">{item.para1}</p>
                    <p className="price"><i className="fa-solid fa-indian-rupee-sign"></i>{item.price}</p>
                    <button onClick={() => { addToCart(item.id) }} className="btn btn-info">Add to cart</button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        {/* Add footer content here */}
      </div>
    </div>
  );
}

export default Frames;
