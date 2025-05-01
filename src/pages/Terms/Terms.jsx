import React from "react";

import { Layout } from "../../components";

import styles from "./Terms.module.css";

const Terms = () => {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Terms & Conditions</h1>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on our website for personal,
              non-commercial transitory viewing only.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Disclaimer</h2>
            <p>
              The materials on our website are provided on an 'as is' basis. We
              make no warranties, expressed or implied, and hereby disclaim and
              negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Limitations</h2>
            <p>
              In no event shall we or our suppliers be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on our website.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
