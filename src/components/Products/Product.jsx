import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

import { addToCart } from "../../features/cart/cartSlice";
import { addToFavList } from "../../features/favorites/favoritesSlice";
import styles from "../../styles/Product.module.css";

const Product = (item) => {
  const dispatch = useDispatch();
  //TODO: do usuniecia nie uzywane variables
  const { title, images, description, variants, quantity } = item;

  const [currentImage, setCurrentImage] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const price = variants && variants.length > 0 ? variants[0].price : 0;

  const colors = [...new Set(variants.map((variant) => variant.color))];

  const sizes = [...new Set(variants.map((variant) => variant.size))];

  useEffect(() => {
    if (!images || !images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  const addItemToCart = () => {
    const selectedVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
    //TODO:
    // if (!selectedVariant) {
    //   return;
    // }
    if (!selectedVariant) return;
    dispatch(addToCart({ ...item, id: selectedVariant.id }));
  };

  const addItemToFav = () => {
    dispatch(addToFavList(item));
  };

  const isDisabled = !selectedColor || !selectedSize;

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          //TODO: img
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {Array.isArray(images) &&
            images.map((image, i) => (
              <div
                key={i}
                className={styles.image}
                //TODO: img
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setCurrentImage(image)}
              />
            ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        {colors.length > 0 && (
          <div className={styles.colors}>
            <span>Color:</span>
            <div className={styles.list}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${styles.color} ${
                    selectedColor === color ? styles.active : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </div>
              ))}
            </div>
          </div>
        )}
        {sizes.length > 0 && (
          <div className={styles.sizes}>
            <span>Size:</span>
            <div className={styles.list}>
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className={`${styles.size} ${
                    selectedSize === size ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}

        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            onClick={addItemToCart}
            className={styles.add}
            disabled={isDisabled}
          >
            Add to cart
          </button>

          <button onClick={addItemToFav} className={styles.favorite}>
            Add to favorites
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
