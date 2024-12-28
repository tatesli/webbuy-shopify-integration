import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../styles/Sidebar.module.css";
import { getCollectionsList } from "../../features/selectors/selectors";

const Sidebar = () => {
  const list = useSelector(getCollectionsList);

  return (
    <section className={styles.sidebar}>
      <h2 className={styles.title}>CATEGORIES</h2>
      <nav>
        <ul className={styles.menu}>
          {list.map(({ id, title }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                to={`/collections/${id}`}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        <a className={styles.link} href="/help">
          Help
        </a>
        <a className={styles.link} href="/terms">
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
