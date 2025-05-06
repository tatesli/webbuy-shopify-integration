import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Products, Layout, Button, ButtonType } from "../../components";
import {
  getCollectionProducts,
  getProductsCollection,
  getSelectedFilters,
  resetFilters,
} from "../../features/collections/collectionSlice";

import styles from "./Collection.module.css";

const Collection = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const selectedFilters = useSelector(getSelectedFilters);
  const { title, list, isLoading, isSuccess } = useSelector(
    getProductsCollection
  );
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredByOptionsProducts = useMemo(() => {
    return list.filter((item) => {
      return Object.keys(selectedFilters).length
        ? Object.keys(selectedFilters).every((filter) => {
            const existingOption = item.options
              .find((option) => option.name === filter)
              .values.map((value) => value.value);

            return selectedFilters[filter]?.length
              ? selectedFilters[filter].some((filter) =>
                  existingOption.includes(filter)
                )
              : true;
          })
        : true;
    });
  }, [list, selectedFilters]);
  const filteredProducts = useMemo(() => {
    return filteredByOptionsProducts.filter((item) => {
      const filteredByName = item.title
        .toLowerCase()
        .includes(name.toLowerCase());
      const filteredByMinPrice = item.price >= minPrice;
      const filteredByMaxPrice = maxPrice ? item.price <= maxPrice : true;

      return filteredByName && filteredByMinPrice && filteredByMaxPrice;
    });
  }, [filteredByOptionsProducts, name, minPrice, maxPrice]);

  const handleReset = () => {
    setName("");
    setMinPrice("");
    setMaxPrice("");
    dispatch(resetFilters());
  };
  useEffect(() => {
    if (collectionId) {
      dispatch(getCollectionProducts(collectionId));
    }
  }, [dispatch, collectionId]);

  return (
    <Layout>
      <section className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <form className={styles.filters}>
          <div className={styles.filter}>
            <input
              type="text"
              name="title"
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              value={name}
            />
          </div>
          <div className={styles.filter}>
            <input
              type="number"
              name="min_price"
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              value={minPrice}
            />
            <span>Price from</span>
          </div>
          <div className={styles.filter}>
            <input
              type="number"
              name="price_max"
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1000"
              value={maxPrice}
            />
            <span>Price to</span>
          </div>
          <button type="submit" hidden />
        </form>
        {isLoading ? (
          <div className="preloader">Loading...</div>
        ) : !isSuccess || filteredProducts.length === 0 ? (
          <div className={styles.back}>
            <span>No results</span>
            <Button
              type={ButtonType.primary}
              onClick={handleReset}
              label="Reset"
            />
          </div>
        ) : (
          <>
            <Products
              title=""
              products={filteredProducts}
              style={{ padding: 0 }}
              amount={filteredProducts.length}
            />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Collection;
