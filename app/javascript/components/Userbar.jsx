import React, { useContext } from "react";
import { UserContext } from "../components/userContext";
import authService from "../services/authService";
import { SignOutButton } from "./Buttons";

const Userbar = ({ currentUser }) => {
  const { setUser } = useContext(UserContext);
  const handleSignOut = async () => {
    try {
      const response = await authService.logout();
      setUser(null);
    } catch {
      (err) => console.log(err);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="p-1 d-flex align-items-center justify-content-center gap-2 bg-light rounded-pill text-dark">
      <p className="m-0">{`Welcome, ${currentUser.name}`}</p>
      <SignOutButton text="Log out" action={handleSignOut} />
    </div>
  );
};
export default Userbar;
