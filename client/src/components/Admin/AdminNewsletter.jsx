import { useEffect, useState } from 'react';
import './AdminNewsletter.css';

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch('http://localhost:5000/newsletter');
        const data = await res.json();
        setSubscribers(data);
      } catch (err) {
        console.error('Failed to fetch subscribers:', err);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/newsletter/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setSubscribers(prev => prev.filter(sub => sub._id !== id));
      } else {
        console.error('Failed to delete subscriber');
      }
    } catch (err) {
      console.error('Error deleting subscriber:', err);
    }
  };

  return (
    <div className="admin-newsletter-container">
      <h3>Newsletter Subscribers</h3>
      {subscribers.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <ul>
          {subscribers.map((sub) => (
            <li key={sub._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              {sub.email}
              <button onClick={() => handleDelete(sub._id)} style={{ marginLeft: '20px', padding: '5px 10px' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNewsletter;
