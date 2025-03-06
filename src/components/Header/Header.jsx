import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import { getProducts } from "../../features/selectors/selectors";
import { selectCartQuantity } from "../../utils/common";
import { toggleForm } from "../../features/user/userSlice";
import { SearchIcon, CartIcon, FavIcon } from "../Icons/Icons";

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
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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
            <SearchIcon className={styles.icon} />
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
            <FavIcon className={styles["icon-fav"]} />
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <CartIcon className={styles["icon-cart"]} />
            <span className={styles.count}>{cartQuantity}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
