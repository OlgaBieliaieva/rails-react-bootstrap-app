import React, { useContext } from "react";
import { UserContext } from "../components/userContext";
import authService from "../services/authService";
import { SignOutButton } from "./Buttons";

const Userbar = ({ currentUser }) => {
  const { setUser } = useContext(UserContext);
  const handleSignOut = async () => {
    try {
      const data = await authService.logout();
      console.log(data);
      setUser(null);
      alert("You are logged out successfully");
    } catch (error) {
      alert("Log out failed!");
    }
  };

  return (
    <div className="p-1 d-flex align-items-center justify-content-center gap-2 bg-light rounded-pill text-dark">
      <p className="m-0">{`Welcome, ${currentUser.email}`}</p>
      <SignOutButton text="Log out" action={handleSignOut} />
    </div>
  );
};
export default Userbar;
