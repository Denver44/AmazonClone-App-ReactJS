import React from "react";
import "../css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "./firebase";

function Header() {
  const [state] = useStateValue();

  const handleAuthentication = () => {
    if (state.user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <MenuIcon className="header__menu" fontSize="large" />
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon_logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchIn" type="text" />
        <SearchIcon className="header__searchIcon" fontSize="large" />
      </div>

      <div className="header__nav">
        <Link to={!state.user && "/login"}>
          {/* Here if the user is not defined then redirect to login Page. */}
          <div className="header__option">
            <span className="header_optionLineOne">
              Hello {state.user ? state.user.email.split("@", 1) : "Guest"}
            </span>
            {/* If user is sigin then Logout. */}
            <span
              onClick={handleAuthentication}
              className="header_optionLineTwo "
            >
              {state.user ? "Sign Out" : "Sign in"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option order">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionsBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header__basketCount">
              {state.basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
