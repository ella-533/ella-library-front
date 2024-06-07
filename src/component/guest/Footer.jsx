import React from 'react';


function FooterPage() {
  return (
    <>
   
    <div>
     
      <h2>Contact Us</h2>
      <div>
        <p>Email: example@example.com</p>
        <p>Phone: +1234567890</p>
        <p>Address: 123 Street, City, Country</p>
      </div>
      <div>
        <h3>Follow us on social media:</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/yourpage">
              <img src="images/facebook.svg" alt="Facebook" /> Facebook
            </a>
          </li>
          <li>
            <a href="https://twitter.com/yourpage">
              <img src="images/square-twitter.svg" alt="Twitter" /> Twitter
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/yourpage">
              <img src="/images/instagram.svg" alt="Instagram" /> Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default FooterPage;