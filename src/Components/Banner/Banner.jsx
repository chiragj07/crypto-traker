import React from "react";

import "./banner.css";

const Banner = ({ search, setSearch }) => {
  return (
    <div className="banner-container">
      <div className="text-container">
        <h2>WELCOME</h2>
        <h4>To</h4>
        <h2>Crypto-Tracker</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Name of Coin"
        />
      </div>
    </div>
  );
};

export default Banner;
