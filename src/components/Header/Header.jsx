import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import {
  getProducts,
  selectUser,
  selectIsAuthenticated,
} from "../../features/selectors/selectors";
import { selectCartQuantity } from "../../utils/common";
import { toggleForm } from "../../features/user/userSlice";

import styles from "../../styles/Header.module.css";

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";
import Profile from "../Profile/Profile";
import UserForm from "../User/UserForm";

const Header = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const allProducts = useSelector(getProducts);
  const cartQuantity = useSelector(selectCartQuantity);
  //TODO: remove all console.log
  console.log("Cart quantity:", cartQuantity);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  console.log(user);
  console.log(isAuthenticated);

  useEffect(() => {
    if (!searchValue) {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchValue, allProducts]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  const handleClick = () => {
    if (isAuthenticated) {
      setShowProfile((prev) => !prev);
    } else {
      dispatch(toggleForm(true));
    }
  };
  //TODO: w utils/common i do reuzycia (wszedzie)
  const cleanId = (id) => id.replace("gid://shopify/Product/", "");

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <img
            className={styles.avatar}
            src={user?.avatar || AVATAR}
            alt="avatar"
          />
          <div className={styles.username}>{user?.name || "Guest"}</div>
        </div>
        {showProfile && <Profile closeProfile={() => setShowProfile(false)} />}
        <UserForm />
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anything.."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className={styles.box}>
              {searchResults.length === 0 ? (
                <p>No results</p>
              ) : (
                searchResults.map(({ id, title, image }) => (
                  <Link
                    key={id}
                    to={`/products/${cleanId(id)}`}
                    onClick={() => {
                      console.log("Navigating to:", `/products/${id}`);
                      setSearchValue("");
                    }}
                    className={styles.item}
                  >
                    <div className={styles.image}>
                      <img
                        src={image ? image : "default-image.jpg"}
                        alt="product"
                      />
                    </div>
                    <div className={styles.title}>{title}</div>
                  </Link>
                ))
              )}
            </div>
          )}
        </form>
        <div className={styles.account}>
          <Link to={ROUTES.FAVORITES} className={styles.favourites}>
            {/* TODO: reactComponent */}
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            <span className={styles.count}>{cartQuantity}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
