import React from "react";
import styled from "styled-components";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <>
      <FooterContainer>
        <div className="column">
          <ul>
            <li>
              <h4> Quick Links</h4>
            </li>
            <li>Home</li>
            <li>Categories</li>
            <li>About Emporium</li>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="column">
          <ul>
            <li>
              <h4> Customer Service</h4>
            </li>
            <li>Help Center</li>
            <li>Returns</li>
            <li>Product Recall</li>
            <li>Store Pickup</li>
            <li>Accessbility</li>
          </ul>
        </div>

        <div className="column">
          <ul>
            <li>
              <h4> About Emporium </h4>
            </li>
            <li>Our Suppliers</li>
            <li>Payments</li>
            <li>Terms of use</li>
            <li>Privacy Policy</li>
            <li>Other Services</li>
          </ul>
        </div>
      </FooterContainer>
      <FooterText> Emporium {currentDate} | All rights Reserved </FooterText>
    </>
  );
};

const FooterContainer = styled.div`
  font-family: "Nunito", sans-serif;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem;
  background-color: #98ddca;
  li {
    list-style-type: none;
    margin-top: 15px;
  }
`;

const FooterText = styled.p`
  font-family: "Nunito", sans-serif;
  text-align: center;
  background-color: #98ddca;
`;

export default Footer;
