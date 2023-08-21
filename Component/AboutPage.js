import React from 'react';
// import './AboutPage.css';
import "../App.css"

const AboutPage = () => {
  return (
    <div className="about-page">
      <h2>Our Cab Service</h2>
      <p>Welcome to our cab service!</p>
      <p>
        We are dedicated to providing reliable and convenient transportation solutions for our customers.
        Whether you need a ride to the airport, a business meeting, or simply want to explore the city,
        we've got you covered.
      </p>
      <p>
        Our fleet of modern and well-maintained vehicles is operated by professional and courteous drivers.
        Your safety and comfort are our top priorities. We strive to ensure that every journey with us
        is enjoyable and stress-free.
      </p>
      <p>
        We offer competitive pricing and flexible booking options to suit your needs. Our user-friendly
        mobile app makes it easy to book a cab, track your ride, and make payments. Alternatively, you can
        also book a cab through our website or by calling our 24/7 customer support.
      </p>
      <p>
        Our commitment to excellent customer service sets us apart. We value your feedback and continuously
        work on improving our services. If you have any questions, concerns, or suggestions, please don't
        hesitate to get in touch. We're here to assist you and ensure you have a fantastic experience
        with our cab service.
      </p>
      <p className='pp'>
        Contact us:+91 98765 43210 <br/>
        Email: mducab@gmail.com
      </p>
    </div>
  );
};

export default AboutPage;
