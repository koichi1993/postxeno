import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // NEW

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products?sort=${sortOrder}`); // UPDATED
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, [sortOrder]); // UPDATED

  return (
  <div className="product-background">
    <h2>Products</h2>

    {/* Sort Dropdown */}
    <div className="sort-dropdown">
      <label>Sort by price: </label>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>

    <div className="product-container">
      {products.map(product => (
        <Link to={`/product/${product._id}`} className="product-card-link" key={product._id}>
          <div className="product-card">
            <img src={`http://localhost:5000${product.imageUrl}`} alt={product.title} />
            <h4>{product.title}</h4>
            <strong>¥{product.price}</strong>
          </div>
        </Link>

      ))}
    </div>
  </div>
);

};

export default ProductList;
