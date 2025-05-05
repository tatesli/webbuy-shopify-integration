import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { ROUTES } from "../../pages/Routes";
import { addToCart } from "../../features/cart/cartSlice";
import { addToFavList } from "../../features/favorites/favoritesSlice";

import { Button, ButtonType } from "../Button";
import styles from "./Product.module.css";

export const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { title, images, description, variants } = product;
  const [currentImage, setCurrentImage] = useState();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const price = selectedVariant?.price ?? variants?.[0]?.price ?? 0;
  const colors = [...new Set(variants.map((variant) => variant.color))];
  const sizes = [...new Set(variants.map((variant) => variant.size))];
  const handleSizeClick = (size) => {
    const newSize = selectedSize === size ? null : size;
    setSelectedSize(newSize);

    const matchedVariant = variants.find(
      (v) => v.color === selectedColor && v.size === newSize
    );
    setSelectedVariant(matchedVariant || null);
  };
  const handleColorClick = (color) => {
    const newColor = selectedColor === color ? null : color;
    setSelectedColor(newColor);

    const matchedVariant = variants.find(
      (v) => v.size === selectedSize && v.color === newColor
    );
    setSelectedVariant(matchedVariant || null);
  };

  useEffect(() => {
    if (!images || !images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  const handleAddItemToCart = () => {
    if (!selectedColor || !selectedSize) {
      enqueueSnackbar("Please select color and size", {
        variant: "error",
      });
      return;
    }

    const selectedVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );

    if (!selectedVariant) {
      return;
    }

    dispatch(addToCart({ ...product, id: selectedVariant.id }));
    enqueueSnackbar("Item added to cart!", {
      variant: "success",
    });
  };

  const addItemToFav = () => {
    dispatch(addToFavList(product));
    enqueueSnackbar("Item added to favorites!", {
      variant: "success",
    });
  };

  return (
    <section className={styles.product}>
      <div className={styles.left}>
        <div className={styles.wrapperCurrent}>
          <img
            src={currentImage}
            className={styles.currentImg}
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
      </div>
      <div className={styles.info}>
        <div>
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
        </div>
        <div>
          <div className={styles.actions}>
            <Button
              type={ButtonType.primary}
              onClick={addItemToFav}
              label="Add to favorites"
              fullWidth
            />
            <Button
              type={ButtonType.primary}
              onClick={handleAddItemToCart}
              fullWidth
              label="Add to cart"
            />
          </div>
          <div className={styles.bottom}>
            <div className={styles.purchase}>19 people purchased</div>
            <Link to={ROUTES.HOME}>Return to store</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
