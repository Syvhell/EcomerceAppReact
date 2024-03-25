import HomeProductCard from "./HomeProductCard";

import { useState, useEffect } from "react";

export default function HomeProducts() {
  const [previews, setPreviews] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all-product`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

        const featured = [];

        for (let i = 0; i < 2; i++) {
          featured.push(
            <HomeProductCard
              data={data[numbers[i]]}
              key={data[numbers[i]._id]}
            />
          );
        }
        setPreviews(featured);
      });
  }, []);

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Galaxy Series</h1>
            <hr />
          </div>
          <div className="row justify-content-center">
            <div className="left col-12 col-md-6 ">
              <video
                playsInline
                autoPlay
                muted
                loop
                src="https://images.samsung.com/ph/smartphones/galaxy-z-fold5/videos/galaxy-z-fold5-highlights-design.webm?imbypass=true"
                className="d-block w-100 img-fluid "
                alt="..."
              />
            </div>
            <div className="right col-12 col-md-6 d-flex flex-wrap gap-2 gap-md-5 justify-content-center py-2">
              {previews}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
