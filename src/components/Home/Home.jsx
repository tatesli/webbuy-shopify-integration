import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Collections from "../Collections/Collections";
import Banner from "../Banner/Banner";

import {
  getProducts,
  getFilteredProducts,
  getCollections,
} from "../../features/selectors/selectors";

import { filterByPrice } from "../../features/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector(getProducts);
  const collections = useSelector(getCollections);
  const filteredProducts = useSelector(getFilteredProducts);

  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    //TODO:
    // if (products.length === 0 || isFiltered) {
    //   return;
    // }
    if (products.length === 0 || isFiltered) return;
    dispatch(filterByPrice(100));
    setIsFiltered(true);
  }, [dispatch, products, isFiltered]);

  return (
    <>
      <Poster />
      <Products products={products} amount={5} title="Trending" />
      <Collections collections={collections} amount={5} title="Worth Seeing" />
      <Banner />
      <Products products={filteredProducts} amount={5} title="Less than 100$" />
    </>
  );
};

export default Home;
