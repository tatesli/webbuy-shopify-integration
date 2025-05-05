import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { Layout } from "../../components";
import { format } from "date-fns";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) return;

    const user = JSON.parse(userData);
    const email = user?.email?.toLowerCase();
    setEmail(email);

    const ordersKey = `orders_${email}`;
    const savedOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

    setOrders(savedOrders);
  }, []);

  if (!email) {
    return <p>You must be signed in to view your order history.</p>;
  }

  return (
    <Layout>
      <section className={styles.container}>
        <h2 className={styles.title}>Your Orders</h2>
        {orders.length === 0 ? (
          <div className={styles.empty}>
            <p>You have no orders yet.</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div key={index} className={styles.orderCard}>
              <h3 className={styles.orderHeader}>Order #{index + 1}</h3>
              <p className={styles.orderDate}>
                Date: {format(new Date(order.date), "dd.MM.yyyy")}
              </p>
              <ul className={styles.productList}>
                {order.cart.map((product, idx) => (
                  <li key={idx} className={styles.productItem}>
                    {product.title} — {product.quantity} × {product.price} PLN
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </Layout>
  );
};

export default Orders;
