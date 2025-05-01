import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { clearCart } from "../../features/cart/cartSlice";

import { Button, ButtonType } from "../Button";
import styles from "./Checkout.module.css";

export const CheckoutForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const rawOrders = localStorage.getItem("orders");
    const rawCart = localStorage.getItem("cart");

    const orders = rawOrders ? JSON.parse(rawOrders) : [];
    const cart = rawCart ? JSON.parse(rawCart) : [];
    const newOrder = {
      ...data,
      cart,
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    dispatch(clearCart());
    reset();
    enqueueSnackbar("Order placed!", {
      variant: "success",
    });
  };
  const { register, handleSubmit, reset } = useForm();

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            placeholder="Enter Last Name"
            autoComplete="off"
            type="text"
            {...register("lastName", { required: true })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Country</label>
          <input
            placeholder="Enter country"
            type="text"
            {...register("country", { required: true })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>City</label>
          <input
            placeholder="Enter city"
            type="text"
            {...register("city", { required: true })}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Address 1</label>
          <input
            placeholder="Enter address 1"
            type="text"
            {...register("address1", { required: true })}
          />
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
            type="tel"
            {...register("phone", { required: true })}
          />
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
