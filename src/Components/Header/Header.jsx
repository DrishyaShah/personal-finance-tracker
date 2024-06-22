import React from "react";
import "./Header.css";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import userSvg from "../../assets/user.svg"

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFnc() {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/")
          toast.success("Logged out successfully")
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message)
        });

    } catch (e) {
      toast.error("Logout failed");
    }
  }

  return (
    <div className="navbar">
      <p style={{ color: "var(--white)", fontWeight: 500, fontSize: "1.2rem" }}>
        Finsimplify
      </p>
      {user && (
        <p
          style={{ color: "var(--white)", fontWeight: 500, fontSize: "1.2rem" }}
          className="logo link"
          onClick={logoutFnc}
        >
           <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
