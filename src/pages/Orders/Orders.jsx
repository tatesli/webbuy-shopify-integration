import React, { useEffect, useState } from "react";
import styles from "./Order.module.css";
import { Layout } from "../../components";
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
    console.log("Loaded orders:", savedOrders);
    setOrders(savedOrders);
  }, []);

  if (!email) {
    return <p>You must be signed in to view your order history.</p>;
  }

  if (orders.length === 0) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <Layout>
      <section className={styles.container}>
        <h2>Your Orders</h2>
        {orders.map((order, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            <h3>Order #{index + 1}</h3>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <ul>
              {order.cart.map((product, idx) => (
                <li key={idx}>
                  {product.title} — {product.quantity} × {product.price} PLN
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Orders;
