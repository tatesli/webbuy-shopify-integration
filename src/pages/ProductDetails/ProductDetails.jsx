import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Product, Products, Layout } from "../../components";
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

const ProductDetails = () => {
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

  return (
    <Layout>
      {isLoading ? (
        <div>Loading product...</div>
      ) : (
        <>
          {product && <Product product={product} />}
          <Products products={related} amount={4} title="Related products" />
        </>
      )}
    </Layout>
  );
};

export default ProductDetails;
