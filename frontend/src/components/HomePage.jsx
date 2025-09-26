import React, { useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  useEffect(() => {
    // Set optimized page title and meta description
    document.title = 'Legacy Vogue - Premium E-commerce Management Platform';
    
    // Update meta description for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Legacy Vogue - Premium E-commerce Management Platform. Advanced admin and seller dashboards with real-time analytics, inventory management, and secure authentication.');
    }
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <header>
          <h1>Legacy Vogue</h1>
          <p className="tagline">Premium E-commerce Management Platform</p>
          <p className="description">Advanced admin and seller dashboards with real-time analytics, inventory management, and secure authentication.</p>
        </header>
        
        <section className="features" aria-label="Platform Features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Real-time Analytics</h3>
              <p>Comprehensive business insights and performance metrics</p>
            </div>
            <div className="feature-item">
              <h3>Inventory Management</h3>
              <p>Advanced stock tracking and product management tools</p>
            </div>
            <div className="feature-item">
              <h3>Secure Authentication</h3>
              <p>Multi-factor authentication and role-based access control</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;