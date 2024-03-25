import React from "react";
import HomeProducts from "../components/HomeProducts";
import Footer from "../components/Footer";
import "./Home.css";
import Highlights from "../components/Highlights";
import FeaturedProducts from "../components/FeaturedProducts";
export default function home() {
  return (
    <div className="hero">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <video
              playsInline="playsInline"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
              src="https://images.samsung.com/ph/smartphones/galaxy-s23-ultra/videos/galaxy-s23-ultra-highlights-design.webm"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption1 d-none d d-md-block">
              <h1>Galaxy S23 Ultra</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FeaturedProducts />
      </div>
      <div>
        <HomeProducts />
      </div>
      <div>
        <Highlights />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
