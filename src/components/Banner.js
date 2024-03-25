import React from "react";
import "./css/Banner.css";

export default function Banner() {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <video
            playsInline="playsInline"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
            src="https://images.samsung.com/is/content/samsung/assets/ph/home-2023/01-hd01-DM-Series-kv-pc-1440x640.mp4"
            className="d-block w-100"
            alt="..."
          />
          <div className="carousel-caption2 d-none d d-md-block">
            <h1>Galaxy S23 Series</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
