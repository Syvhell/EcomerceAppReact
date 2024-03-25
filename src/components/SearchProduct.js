import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Banner from "./Banner";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Check if the search query is not empty
      if (searchQuery.trim() !== "") {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/searchByName`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productName: searchQuery.toLowerCase() }),
          }
        );

        const data = await response.json();

        // Convert product names to lowercase for case-insensitive matching
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        const filteredResults = data.filter((product) =>
          product.name.toLowerCase().includes(lowerCaseSearchQuery)
        );

        setSearchResults(filteredResults);
      } else {
        // If the search query is empty, reset search results
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  const handleBlur = async () => {
    // Check if the input field is empty on blur and reset search results
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center py-3">
        <h4 className="me-3">Product Search</h4>
        <div className="form-group mb-0 me-2">
          <input
            placeholder="Enter Product Name"
            type="text"
            id="courseName"
            className="form-control form-control-sm"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onBlur={handleBlur}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Banner />
      <div className="d-flex flex-wrap gap-4 py-3">
        {searchResults.map((product) => (
          <ProductCard productProp={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductSearch;
