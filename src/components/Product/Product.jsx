import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { Link } from "react-router-dom";
import { Button, ButtonType } from "../Button/Button";

import { ROUTES } from "../../pages/Routes/Routes";

import { addToCart } from "../../features/cart/cartSlice";
import { addToFavList } from "../../features/favorites/favoritesSlice";

import styles from "./Product.module.css";

const Product = (item) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { title, images, description, variants } = item;

  const [currentImage, setCurrentImage] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const price = variants && variants.length > 0 ? variants[0].price : 0;

  const colors = [...new Set(variants.map((variant) => variant.color))];

  const sizes = [...new Set(variants.map((variant) => variant.size))];

  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  const handleColorClick = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  useEffect(() => {
    if (!images || !images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  const addItemToCart = () => {
    const selectedVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
    if (!selectedVariant) {
      return;
    }
    dispatch(addToCart({ ...item, id: selectedVariant.id }));
    enqueueSnackbar("Item added to cart!", {
      variant: "success",
    });
  };

  const addItemToFav = () => {
    dispatch(addToFavList(item));
    enqueueSnackbar("Item added to favorites!", {
      variant: "success",
    });
  };

  const isDisabled = !selectedColor || !selectedSize;

  return (
    <section className={styles.product}>
      <div className={styles.wrapperCurrent}>
        <img
          src={currentImage}
          className={styles.current}
          alt="current_image"
        />
      </div>
      <div className={styles.imagesList}>
        {Array.isArray(images) &&
          images.map((image, i) => (
            <img
              alt="images_list"
              src={image}
              key={i}
              className={styles.image}
              onClick={() => setCurrentImage(image)}
            />
          ))}
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        {colors.length > 0 && (
          <div className={styles.colors}>
            <span>Color:</span>
            <div className={styles.list}>
              {colors.map((color, index) => (
                <Button
                  key={index}
                  type={
                    selectedColor === color
                      ? ButtonType.primary
                      : ButtonType.default
                  }
                  onClick={() => handleColorClick(color)}
                  label={color}
                />
              ))}
            </div>
          </div>
        )}
        {sizes.length > 0 && (
          <div className={styles.sizes}>
            <span>Size:</span>
            <div className={styles.list}>
              {sizes.map((size, index) => (
                <Button
                  type={
                    selectedSize === size
                      ? ButtonType.primary
                      : ButtonType.default
                  }
                  key={index}
                  onClick={() => handleSizeClick(size)}
                  label={size}
                />
              ))}
            </div>
          </div>
        )}
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <Button
            type={ButtonType.primary}
            onClick={addItemToFav}
            label="Add to favorites"
          />
          <Button
            type={ButtonType.primary}
            onClick={addItemToCart}
            fullWidth
            disabled={isDisabled}
            label="Add to cart"
          />
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
