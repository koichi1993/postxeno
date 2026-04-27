import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminDashboardLayout.css';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/admin/login');
};

  return (
    <div className="admin-dashboard-layout">
      <h2 style={{color: 'black'}}>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <nav>
        <Link to="products">Manage Products</Link> | <Link to="orders">View Orders</Link> | <Link to="newsletter">View Subscribers</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;