import React from "react";
import Footer from "../components/Footer";
import "./About.css";

export default function About() {
  return (
    <>
      <div className="about container-fluid vh-100 ">
        <div className="container">
          <div className="row justify-content-center">
            <div>
              <h1>
                <i className="user fa fa-mobile fa-2x mb-4"></i>moPhie .Inc
              </h1>
            </div>
            <section>
              <h2>Mission & Vision</h2>
              <div className="mission-vision">
                <p>
                  Our mission is to provide innovative and reliable mobile power
                  solutions, enhancing the way you live and work with your
                  devices.
                </p>
                <p>
                  Our vision is to be a global leader in mobile power, creating
                  products that empower people to live connected and productive
                  lives.
                </p>
              </div>
            </section>

            <section>
              <h2>Contact Us</h2>
              <div className="contact">
                <p>Email: info@mophie.com</p>
                <p>Phone: 123-456-7890</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
