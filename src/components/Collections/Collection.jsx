import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCollectionProducts } from "../../features/collections/collectionSlice";
import { getProductsCollection } from "../../features/selectors/selectors";

import Products from "../Products/Products";
import { Button, ButtonType, ButtonSize } from "../../components/Button/Button";

import styles from "../../styles/Collection.module.css";

const Collection = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();

  const { title, list, isLoading, isSuccess } = useSelector(
    getProductsCollection
  );

  //TODO: https://www.react-hook-form.com/
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = list.filter((item) => {
    const filteredByName = item.title
      .toLowerCase()
      .includes(name.toLowerCase());
    const filteredByMinPrice = item.price >= minPrice;
    const filteredByMaxPrice = maxPrice ? item.price <= maxPrice : true;

    return filteredByName && filteredByMinPrice && filteredByMaxPrice;
  });
  const resetFilters = () => {
    setName("");
    setMinPrice("");
    setMaxPrice("");
  };
  useEffect(() => {
    if (collectionId) {
      dispatch(getCollectionProducts(collectionId));
    }
  }, [dispatch, collectionId]);

  return (
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
            type="text"
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
            placeholder="0"
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
            size={ButtonSize.medium}
            onClick={resetFilters}
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
  );
};

export default Collection;
