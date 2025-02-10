import { User } from "../types";

export const getUserDetails = () => {
  const storedUserState = localStorage.getItem("userState");
  return storedUserState ? JSON.parse(storedUserState) : null;
};

export const setUserState = (userState: User) => {
  localStorage.setItem("userState", JSON.stringify(userState));
};
