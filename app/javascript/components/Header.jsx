import React from "react";
import Logo from "./Logo";
import Authbar from "./Authbar";

const Header =() => {
    return (
        <header className="w-100 p-3 d-flex justify-content-between text-light align-items-center">
        <Logo/>
        <Authbar/>
       
        {/* <div>
          <img
            // className={styles.userBarAvatar}
            src="https://res.cloudinary.com/de3wlojzp/image/upload/v1731961136/noUserPhoto_phuwu9.jpg"
            alt="user"
            width={32}
            height={32}
          />
        </div> */}
      </header>
    )
}

export default Header