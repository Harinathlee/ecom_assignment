import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/actions";
import { RootState } from "../store/store";

import { Moon, Sun, Home, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const cart = useSelector((state: unknown) => state as RootState).cart;
  const theme = useSelector((state: unknown) => state as RootState).theme;
  const dispatch = useDispatch();
  const location = useLocation();
  const [cartState, setCartState] = useState(cart);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  useEffect(() => {
    if (cartState.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartState));
    } else {
      const cartFromLocalStorage = localStorage.getItem("cart");
      const formattedCart = cartFromLocalStorage
        ? JSON.parse(cartFromLocalStorage)
        : { items: [], totalValue: 0 };
      setCartState(formattedCart);
    }
  }, [cartState]);

  return (
    <nav className={`py-4 bg-indigo-700 text-white`}>
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          {location.pathname === "/profile" || location.pathname === "/cart" ? (
            <Link
              to="/"
              className="flex items-center justify-center w-10 h-10 text-white bg-indigo-900 rounded-full"
            >
              <Home className="w-6 h-6 text-white" />
            </Link>
          ) : (
            <Link
              to="/profile"
              className="flex items-center justify-center w-10 h-10 text-white bg-indigo-900 rounded-full"
            >
              <span className="text-lg">JD</span>
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 font-bold"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme.theme === "light" ? (
              <Moon className="w-6 h-6 text-white" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-500" />
            )}
          </button>
          {cartState.totalValue > 0 ? (
            <Link
              to="/cart"
              className="flex items-center justify-center p-2 text-white bg-indigo-900 rounded-md"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              <h1 className={`ml-2 text-lg font-bold text-white`}>
                ${cartState.totalValue}
              </h1>
            </Link>
          ) : (
            <div className="flex items-center justify-center p-2 text-white bg-indigo-900 rounded-md cursor-not-allowed">
              <ShoppingBag className="w-6 h-6 text-white" />
              <h1 className={`ml-2 text-lg font-bold text-white`}>
                ${cartState.totalValue}
              </h1>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
