import React, { useState } from "react";
import Slider from "../../components/slider/Slider";
import Product from "../../components/product/Product";

const Home = () => {
  return (
    <div>
      {<Slider />}
      <Product />
    </div>
  );
};

export default Home;
