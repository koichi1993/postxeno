import { useState } from 'react';
import './NewsletterSignup.css';


const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      const response = await fetch('http://localhost:5000/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.status === 201) {
        setStatus('✅ Subscribed!');
        setEmail('');
      } else {
        setStatus(`⚠️ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Something went wrong.');
    }
  };

 return (
  <div className="newsletter-section">
    <h3>Subscribe to our newsletter</h3>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Subscribe</button>
    </form>
    {status && <p className="status-message">{status}</p>}
  </div>
);

};

export default NewsletterSignup;
