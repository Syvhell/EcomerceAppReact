import { useState, useEffect } from "react";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedProducts({ cartHandleClickAdd }) {
  const [previews, setPreviews] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all-product`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const numbers = [];

        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.length);
          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };
        for (let i = 0; i < 5; i++) {
          generateRandomNums();
          featured.push(
            <PreviewProducts
              data={data[numbers[i]]}
              key={data[numbers[i]._id]}
              breakPoint={2}
              cartHandleClickAdd={cartHandleClickAdd}
            />
          );
        }
        setPreviews(featured);
      });
  }, []);
  return (
    <>
      <div className="hero container pt-5 ">
        <h1 className="display-6 fw-bolder text-center">What's New</h1>
        <hr></hr>
        <div className="card-group justify-content-center gap-3">
          {previews}
        </div>
      </div>
      <div className="my-3">
        <h6 className=" text-center">Featured Products</h6>
      </div>
    </>
  );
}
