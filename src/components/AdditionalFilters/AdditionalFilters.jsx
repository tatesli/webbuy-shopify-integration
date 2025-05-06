import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getAvailableOptions,
  setFilter,
  getSelectedFilters,
} from "../../features/collections/collectionSlice";

import styles from "./AdditionalFilters.module.css";

export const AdditionalFilters = () => {
  const availableOptions = useSelector(getAvailableOptions);
  const selectedFilters = useSelector(getSelectedFilters);
  const dispatch = useDispatch();

  const handleChange = (option, value) => {
    dispatch(setFilter({ option, value }));
  };

  return (
    <div className={styles.wrapper}>
      {Object.keys(availableOptions).map((option) => (
        <div key={option} className={styles.type}>
          <h3>{option}</h3>
          <div className={styles.filters}>
            {availableOptions[option].map((value) => {
              const isChecked = selectedFilters[option]?.includes(value);

              return (
                <div key={value} className={styles.filter}>
                  <input
                    type="checkbox"
                    name={option}
                    value={value}
                    checked={!!isChecked}
                    onChange={() => handleChange(option, value)}
                  />
                  <label htmlFor={value} className={styles.label}>
                    {value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
