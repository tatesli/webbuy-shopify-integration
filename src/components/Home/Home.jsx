import React from "react";
import { useSelector } from "react-redux";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Collections from "../Collections/Collections";

import { getProducts } from "../../features/selectors/selectors";
import { getCollections } from "../../features/selectors/selectors";

const Home = () => {
  const products = useSelector(getProducts);
  const collections = useSelector(getCollections);

  return (
    <>
      <Poster />
      <Products products={products} amount={5} title="Trending" />
      <Collections collections={collections} amount={5} title="Worth Seeing" />
    </>
  );
};

export default Home;
