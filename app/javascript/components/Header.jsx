import React, { useContext } from "react";
import { UserContext } from "../components/userContext";
import Logo from "./Logo";
import Authbar from "./Authbar";
import Userbar from "./Userbar";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="w-100 p-3 d-flex justify-content-between text-light align-items-center">
      <Logo />
      {!user ? <Authbar /> : <Userbar currentUser={user} />}
    </header>
  );
};

export default Header;
