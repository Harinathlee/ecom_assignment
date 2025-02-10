import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductsList from "./components/ProductsList";
import NavigationBar from "./layout/NavigationBar";
import ProfilePage from "./components/ProfilePage";
import CartPage from "./components/CartPage";
import { User } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const initialState: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "9876543210",
};

const App = () => {
  const [userState, setUserState] = useState<User>(initialState);
  const { theme } = useSelector((state: unknown) => state as RootState);

  useEffect(() => {
    const storedUserState = localStorage.getItem("userState");
    if (storedUserState) {
      setUserState(JSON.parse(storedUserState));
    } else {
      localStorage.setItem("userState", JSON.stringify(initialState));
    }
  }, []);

  useEffect(() => {
    if (theme.theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [theme.theme]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
