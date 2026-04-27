import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'; 


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setStatus('❌ Failed to load product');
      }
    };

    fetchProduct();
  }, [id]);

 const handleBuy = async () => {
  try {
    const res = await fetch('http://localhost:5000/checkout/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setStatus('⚠️ Failed to start checkout');
    }
  } catch (err) {
    console.error(err);
    setStatus('❌ Could not start checkout');
  }
};


if (status) return <p>{status}</p>;
if (!product) return <p>Loading...</p>;


  return (
    <div className="product-details-page">
      <h1 className="site-logo">POSTXENO</h1>
      <div className="product-details-container">
        <img
          className="product-image"
          src={`http://localhost:5000${product.imageUrl}`}
          alt={product.title}
        />
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">¥{product.price}</p>
          <button className="buy-button" onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
