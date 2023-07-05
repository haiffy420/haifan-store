import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../public/assets/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="logo">
      <Link href="/">
          <a><Image src={logo} width={40} height={40} alt="logo" /></a>
        </Link>
      <p>
        Gaming Laptops & Gears.
      </p>
      </div>
      

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
