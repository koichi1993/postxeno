import { useEffect, useState } from 'react';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    imageUrl: '',
    price: ''
  });
  const [status, setStatus] = useState('');

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.imageFile); // 👈 imageFile instead of imageUrl

    const res = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (res.status === 201) {
      setStatus('✅ Product added');
      setNewProduct({ title: '', description: '', imageFile: null, price: '' });
      fetchProducts();
    } else {
      const data = await res.json();
      setStatus(`❌ ${data.message || 'Error'}`);
    }
  } catch (err) {
    console.error(err);
    setStatus('❌ Server error');
  }
};


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 200) {
        setStatus('🗑️ Product deleted');
        fetchProducts();
      } else {
        const data = await res.json();
        setStatus(`❌ ${data.message || 'Delete failed'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error');
    }
  };

  return (
    <div className="admin-products-container">
      <form onSubmit={handleAddProduct} className="admin-products-form">
        <input type="text" placeholder="Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} required /><br />
        <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} /><br />
        <input type="file" accept="image/*" onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files[0] })} /><br />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required /><br />
        <button type="submit">Add Product</button>
      </form>

      <hr />

      <h3>Current Products</h3>
      {products.length === 0 && <p>No products yet.</p>}
      {products.map(product => (
      <div key={product._id} className="product-entry">
        <h4>{product.title}</h4>
        <p>{product.description}</p>
        <p><strong>¥{product.price}</strong></p>
        <img
          src={`http://localhost:5000${product.imageUrl}`}
          alt={product.title}
        />
        <br />
        <button onClick={() => handleDelete(product._id)}>Delete</button>
      </div>
    ))}


      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default AdminProducts;