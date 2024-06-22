import React from "react";
import { useState } from "react";
import "../../App.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { getAuth, createUserWithEmailAndPassword, getMultiFactorResolver } from "firebase/auth";
import { auth } from "../../Firebase";
import {  toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, db, getDoc, provider } from "../../Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate()


  const signUpWithEmail = async () => {
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", pwd);
    console.log("Confirm pwd", confirmPwd);
    //Authenticate the user or basically create a new account using email and pass

    if (name != "" && email != "" && pwd != "" && confirmPwd != "") {
      if (pwd == confirmPwd) {
      await createUserWithEmailAndPassword(auth, email, pwd)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User: ", user);
            toast.success("User created");
            setLoading(false);
            setName("");
            setEmail("");
            setPwd("");
            setConfirmPwd("");
            createDoc(user)
            setLoginForm(true)
            // create a doc with user id as the following id
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            // ..
          });
      } else {
        toast.error("Password doesn't match Confirm password");
      }
    } else {
      setLoading(false);
      toast.error("All fields are mandatory");
    }
  };

  const loginUsingEmail = async () => {
    setLoading(true)
    console.log("Email", email);
    console.log("Password", pwd);
    if (email !== "" && pwd !== "") {
    await  signInWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Logged in!");
          setLoading(false)
          console.log("User logged in", user);
          // Navigate to dashboard
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false)
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false)
    }
  };

  const signInWithGoogle = () => 
    {
      setLoading(true)
      try {
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("user: " , user)
    createDoc(user)
    toast.success("Logged In!")
    navigate("/dashboard")
    setLoading(false)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    toast.error("Authentication failed")
    setLoading(false)
    // ...
  });
      }
      catch (e)
      {
        toast.error(e.message)
        setLoading(false)
      }
      
      
    }


  const createDoc = async (user) => {
    //Make sure doc with that uid doesnt exist
    if (!user) return;

    const userRef = doc(db, "users" , user.uid)
    const userData = await getDoc(userRef)
    if(!userData.exists()) {
    try {
    await setDoc(doc(db, "users" , user.uid), {
      
      name: user.displayName ? user.displayName : name,
      email,
      photoURL: user.photoURL ? user.photoURL : "",
      createdAt: new Date(),
    })
    toast.success("Doc created")
  } 
  catch (e)
  {
    toast.error(e.message)
  }
}
else 
{
  toast.error("Doc exists")
}
  };
  
  
  return (
    <>
      {loginForm ?
      <>
        <div className="signup-wrapper">
          <h2 className="title">
            Log in to <span style={{ color: "var(--theme)" }}>Finsimplify</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              state={email}
              type="email"
              setState={setEmail}
              placeholder={"example123@gmail.com"}
              className="text-field"
            />

            <Input
              label={"Password"}
              state={pwd}
              setState={setPwd}
              type="password"
              className="password-input"
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using email and password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login" style={{ textAlign: "center" }}>or</p>
            <Button
              onClick={signInWithGoogle}
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
            />
            <p  className="p-login" onClick={() => setLoginForm(false)} style={{textAlign: "center" , margin:0}} >Don't have an account? Click here </p>
          </form>
        </div>
      </>
      :
      <div className="signup-wrapper">
        <h2 className="title">
          Sign up on <span style={{ color: "var(--theme)" }}>Finsimplify</span>
        </h2>
        <form>
          <Input
            label={"Full Name"}
            state={name}
            setState={setName}
            placeholder={"Drishya Shah"}
            className="text-field"
          />

          <Input
            label={"Email"}
            state={email}
            type="email"
            setState={setEmail}
            placeholder={"example123@gmail.com"}
            className="text-field"
          />

          <Input
            label={"Password"}
            state={pwd}
            setState={setPwd}
            type="password"
            className="password-input"
          />

          <Input
            label={"Confirm Password"}
            state={confirmPwd}
            setState={setConfirmPwd}
            type="password"
            className="password-input"
          />
          <Button

            disabled={loading}
            text={loading ? "Loading..." : "Signup using email and password"}
            onClick={signUpWithEmail}
          />
          <p className="p-login" style={{ textAlign: "center" }}>or</p>
          <Button
            onClick={signInWithGoogle}
            text={loading ? "Loading..." : "Signup using Google"}
            blue={true}
          />
          <p className="p-login" onClick={() => setLoginForm(true)} style={{textAlign: "center" , margin:0}} >Already have an account? Click here </p>
        </form>
      </div>
      }
    </>
  );
};
export default Login;
