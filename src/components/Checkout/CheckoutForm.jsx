import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { getCart } from "../../features/cart/cartSlice";
import { clearCart } from "../../features/cart/cartSlice";

import { Button, ButtonType } from "../Button";
import styles from "./Checkout.module.css";
import { isTemplateSpan } from "typescript";

export const CheckoutForm = () => {
  const cart = useSelector(getCart);
  const items = cart.itemsList;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email?.toLowerCase();
    if (!email) {
      enqueueSnackbar("Sign in to view your purchase history!", {
        variant: "error",
      });
      return;
    }

    const ordersKey = `orders_${email}`;
    const rawOrders = localStorage.getItem(ordersKey);
    const orders = rawOrders ? JSON.parse(rawOrders) : [];

    const newOrder = {
      cart: items,
      date: new Date().toISOString(),
    };
    console.log("itemsList:", items);

    orders.push(newOrder);
    console.log("Saving new order:", newOrder);
    console.log("All orders now:", orders);
    localStorage.setItem(ordersKey, JSON.stringify(orders));
    localStorage.removeItem("cart");
    dispatch(clearCart());
    reset();
    enqueueSnackbar("Order placed!", {
      variant: "success",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter First Name"
            {...register("firstName", {
              required: " Name is required",
            })}
          />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            placeholder="Enter Last Name"
            autoComplete="off"
            type="text"
            {...register("lastName", {
              required: "Last Name is required",
            })}
          />
          {errors.lastName && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Country</label>
          <input
            placeholder="Enter country"
            type="text"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <p className={styles.error}>{errors.country.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>City</label>
          <input
            placeholder="Enter city"
            type="text"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Address 1</label>
          <input
            placeholder="Enter address 1"
            type="text"
            {...register("address1", { required: "Address is required" })}
          />
          {errors.address1 && (
            <p className={styles.error}>{errors.address1.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Address 2</label>
          <input
            placeholder="Enter address 2"
            type="text"
            {...register("address2")}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input
            placeholder="+48"
            type="number"
            {...register("phone", { required: "Phone Number is required" })}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Zip Code</label>
          <input
            placeholder="Enter Zip Code"
            type="text"
            {...register("zip", {
              required: "Zip is required",
              pattern: {
                value: /^[0-9]{2}-[0-9]{3}$/,
                message: "Use format: 00-000",
              },
            })}
          />
          {errors.zip && <p className={styles.error}>{errors.zip.message}</p>}
        </div>
      </form>
      <div className={styles.btnWrapper}>
        <Button
          type={ButtonType.primary}
          onClick={handleSubmit(onSubmit)}
          label="Continue"
        />
      </div>
    </section>
  );
};
