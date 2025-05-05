import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faBagShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import LOGO from "../../assets/images/logo.svg";
import { ROUTES } from "../../pages/Routes/Routes";
import { getAllProducts } from "../../features/products/productsSlice";
import { getUser } from "../../features/user/userSlice";
import { selectCartQuantity, cleanProductId } from "../../utils/common";
import { toggleForm } from "../../features/user/userSlice";

import { Button, ButtonType } from "../Button";
import { Modal } from "../Modal";
import { Profile } from "../Profile";
import { Sidebar } from "../Sidebar";
import { UserForm } from "../User";
import { AdditionalFilters } from "../AdditionalFilters";
import styles from "./Header.module.css";
import { getSelectedFilters } from "../../features/collections/collectionSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const selectedFilter = useSelector(getSelectedFilters);

  const allProducts = useSelector(getAllProducts);
  const cartQuantity = useSelector(selectCartQuantity);
  const { user, isAuthenticated } = useSelector(getUser);

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };
  const handleBurgerClick = () => {
    setShowSidebar((prev) => !prev);
  };
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
      <Link to={ROUTES.HOME}>
        <img className={styles.logo} src={LOGO} alt="webbuy" />
      </Link>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          {user?.avatar ? (
            <img
              className={styles.avatar}
              src={user?.avatar || undefined}
              alt="avatar"
            />
          ) : (
            <FontAwesomeIcon
              className={styles.userIcon}
              icon={faUser}
              size="2x"
            />
          )}
          <div className={styles.username}>{user?.name || "Guest"}</div>
        </div>

        <form className={`${styles.form} ${showSearch ? styles.showForm : ""}`}>
          <div className={styles.icon} onClick={handleSearchClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <div
            className={`${styles.input} ${showSearch ? styles.showInput : ""}`}
          >
            <input
              type="search"
              name="search"
              placeholder="Search for anything.."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
              autoFocus={showSearch}
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
            icon={<FontAwesomeIcon icon={faHeart} size="2x" />}
            onClick={() => navigate(ROUTES.FAVORITES)}
          />
          <Button
            type={ButtonType.primaryIcon}
            icon={<FontAwesomeIcon icon={faBagShopping} size="2x" />}
            onClick={() => navigate(ROUTES.CART)}
          >
            <span className={styles.count}>{cartQuantity}</span>
          </Button>
        </div>
        <div className={styles.burger}>
          <Button
            type={ButtonType.primaryIcon}
            icon={<FontAwesomeIcon icon={faBars} size="2x" />}
            onClick={handleBurgerClick}
          />
          {Object.keys(selectedFilter).length > 0 && (
            <div className={styles.filter}>
              <p>{selectedFilter.title}</p>
            </div>
          )}
        </div>
      </div>
      {showSidebar && (
        <Modal
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          title={"Categories"}
        >
          <Sidebar onClose={() => setShowSidebar(false)} />
          {params.collectionId && !params.productId && <AdditionalFilters />}
        </Modal>
      )}
      {showProfile && (
        <Profile isOpen={showProfile} onClose={() => setShowProfile(false)} />
      )}
      <UserForm />
    </div>
  );
};
