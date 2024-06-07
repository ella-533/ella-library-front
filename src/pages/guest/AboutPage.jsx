import Footer from "../../component/guest/Footer";
import Header from "../../component/guest/Header";
import React from 'react';

function AboutUs() {
  return (
    <div>
        < Header />
      <h2>About Us</h2>
      <p>Welcome to our virtual book library! We're passionate about books and believe in the power of literature to inspire, educate, and entertain.</p>
      <p>Our platform is designed to connect book lovers from around the world. Whether you're a seasoned reader or just starting your literary journey, you'll find something here to pique your interest.</p>
      <p>At our library, you can explore a diverse collection of books across various genres. From timeless classics to contemporary bestsellers, there's something for everyone.</p>
      <p>We value the exchange of ideas and opinions, which is why we encourage users to engage with our community through comments and ratings. Your feedback helps fellow readers discover new books and make informed choices.</p>
      <p>Join us in celebrating the magic of storytelling and the joy of reading. Happy browsing!</p>
      <Footer />
    </div>
  );
}

export default AboutUs