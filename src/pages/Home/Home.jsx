import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Poster, Products, Collections, Banner } from "../../components";

import {
  getAllProducts,
  getFilteredProducts,
  filterByPrice,
} from "../../features/products/productsSlice";
import { getAllCollections } from "../../features/collections/collectionsSlice";
import { Layout } from "../../components";

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
    <Layout>
      <Poster />
      <Products products={products} amount={4} title="Trending" />
      <Collections collections={collections} title="Worth Seeing" />
      <Banner />
      <Products products={filteredProducts} amount={4} title="Less than 100$" />
    </Layout>
  );
};

export default Home;
