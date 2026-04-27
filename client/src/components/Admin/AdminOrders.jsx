import { useEffect, useState } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h3>Customer Orders</h3>
      {Array.isArray(orders) ? (
        orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card">
              <p><strong>Product:</strong> {order.productTitle}</p>
              <p><strong>Customer:</strong> {order.userEmail}</p>
              <p><strong>Paid:</strong> ¥{order.amountPaid}</p>
              <p><strong>Status:</strong> {order.paymentStatus}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))
        )
      ) : (
        <p className="error-message">❌ Failed to load orders. Check login or server.</p>
      )}
    </div>
  );
};

export default AdminOrders;