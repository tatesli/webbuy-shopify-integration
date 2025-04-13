import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Product from "../../components/Product/Product";
import Products from "../../components/Products/Products";

import {
  getProduct,
  clearProduct,
  getSingleProduct,
} from "../../features/products/productSlice";

import {
  relatedByType,
  getAllProducts,
  getRelatedByTypeProducts,
} from "../../features/products/productsSlice";

const SingleProduct = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();

  const product = useSelector(getSingleProduct);

  const products = useSelector(getAllProducts);

  const related = useSelector(getRelatedByTypeProducts);

  const isLoading = useSelector((state) => state.product.isLoading);

  useEffect(() => {
    dispatch(getProduct(`gid://shopify/Product/${productId}`));
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && products.length > 0) {
      dispatch(relatedByType(product.productType));
    }
  }, [dispatch, product, products]);

  if (isLoading) {
    return <div>Loading product...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Product {...product} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
