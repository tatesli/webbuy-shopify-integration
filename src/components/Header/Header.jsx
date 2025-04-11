import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { ROUTES } from "../../pages/Routes/Routes";
import { getAllProducts } from "../../features/products/productsSlice";
import { getUser } from "../../features/user/userSlice";
import { selectCartQuantity, cleanProductId } from "../../utils/common";
import { toggleForm } from "../../features/user/userSlice";
import { Button, ButtonType } from "../../components/Button/Button";
import Profile from "../Profile/Profile";
import UserForm from "../User/UserForm";

import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

import LOGO from "../../assets/images/logo.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const allProducts = useSelector(getAllProducts);
  const cartQuantity = useSelector(selectCartQuantity);
  const { user, isAuthenticated } = useSelector(getUser);

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

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          {user?.avatar ? (
            <img
              className={styles.avatar}
              src={user?.avatar || undefined}
              alt="avatar"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
          <div className={styles.username}>{user?.name || "Guest"}</div>
        </div>
        {showProfile && <Profile closeProfile={() => setShowProfile(false)} />}
        <UserForm />
        <form className={styles.form}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
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
                    to={`/products/${cleanProductId(id)}`}
                    onClick={() => {
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
          <Button
            type={ButtonType.primaryIcon}
            icon={<FontAwesomeIcon icon={faHeart} />}
            onClick={() => navigate("/favorites")}
          />
          <Button
            type={ButtonType.primaryIcon}
            icon={<FontAwesomeIcon icon={faBagShopping} />}
            onClick={() => navigate("/cart")}
          >
            <span className={styles.count}>{cartQuantity}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
