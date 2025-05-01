import React from "react";

import { Layout } from "../../components";

import styles from "./Help.module.css";

const Help = () => {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Help Center</h1>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.question}>
              <h3>How do I place an order?</h3>
              <p>
                Browse our products, add items to your cart, and proceed to
                checkout. Follow the simple steps to complete your purchase.
              </p>
            </div>
            <div className={styles.question}>
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept major credit cards, PayPal, and other secure payment
                methods.
              </p>
            </div>
            <div className={styles.question}>
              <h3>How can I track my order?</h3>
              <p>
                Once your order is shipped, you'll receive a tracking number via
                email to monitor your delivery.
              </p>
            </div>
          </section>
          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>Need additional help? Contact our customer support team:</p>
            <p>Email: support@example.com</p>
            <p>Phone: 1-800-123-4567</p>
            <p>Hours: Monday - Friday, 9am - 5pm EST</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
