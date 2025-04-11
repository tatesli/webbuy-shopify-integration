import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Poster from "../../components/Poster/Poster";
import Products from "../../components/Products/Products";
import Collections from "../../components/Collections/Collections";
import Banner from "../../components/Banner/Banner";

import {
  getAllProducts,
  getFilteredProducts,
  filterByPrice,
} from "../../features/products/productsSlice";
import { getAllCollections } from "../../features/collections/collectionsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector(getAllProducts);

  const collections = useSelector(getAllCollections);

  const filteredProducts = useSelector(getFilteredProducts);

  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (!isFiltered && products.length > 0) {
      dispatch(filterByPrice(100));
      setIsFiltered(true);
    }
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
