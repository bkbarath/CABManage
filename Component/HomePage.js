import React from "react";
import "./HomePage.css"
import { Link } from "react-router-dom";
import InfiniteCardSlider from "./infinitecard";

function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h2>We with you on 'Travel'</h2>
          <p>With us Move everywheres where you want to go at any time :)' .</p>
          <Link to="/userlogin" className="butn">Get Start</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <i className="fas fa-desktop"></i>
          <h3>24/7 Customer Support</h3>
          <p>Offering round-the-clock customer support .</p>
        </div>
        <div className="feature">
          <i className="fas fa-cogs"></i>
          <h3>Timely Pickups</h3>
          <p>Ensuring reliable pickups for customer satisfaction.</p>
        </div>
        <div className="feature">
          <i className="fas fa-cogs"></i>
          <h3>Clear Communication</h3>
          <p>Effective communication with customers is vital.</p>
        </div>
        <div className="feature">
          <i className="fas fa-users"></i>
          <h3>Safety and Security</h3>
          <p>Prioritizing passenger safety and security is a must</p>
        </div>
            
      </section>
      <br />
      <div> <InfiniteCardSlider/></div>
      <footer>
        <p>&copy; 2023 Cab Service. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
