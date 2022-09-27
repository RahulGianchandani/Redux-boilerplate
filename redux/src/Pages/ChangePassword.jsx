import "./signup.css";
import SuccessChangePassword from "./SuccessChangePassword";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import * as forgotPasswordAction from "../redux/actions/forgotPassword.action";
import { forgotPassword } from "../redux/actions/forgotPassword.action";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { changePass } from "../redux/actions/changePassword.action";
import { setupSuccessRequest } from "../redux/actions/setupSuccess.action";
import { MdCancel } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { MdCircle } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

const ChangePassword = () => {
  const { token, email } = useParams();
  // console.log(token);
  // console.log(email);


  const passExpr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})/i;
  // const charLengthExpr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})/i;
  const lowerCaseExpr = /^(?=.*[a-z])/g; 
  const upperCaseExpr = /^(?=.*[A-Z])/g;
  const numbersExpr = /^(?=.*[0-9])/g;
  const specialCharExpr = /^(?=.*[.!@#\$%\^&\*])/g;
  

  const regexPass = new RegExp(passExpr);
  // const regexCharLength = new RegExp(charLengthExpr);
  const regexLowerCase = new RegExp(lowerCaseExpr);
  const regexUpperCase = new RegExp(upperCaseExpr);
  const regexNumbers = new RegExp(numbersExpr);
  const regexSpecialChar = new RegExp(specialCharExpr);
 

  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [charLength, setCharLength] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [threeConditions, setThreeConditions] = useState(false)
  const [focus, setFocus] = useState(false)
  

  const navigate = useNavigate();

  const { forgotPass, setupsuccess, user } = useSelector((state) => state);
  // console.log(forgotPass);
  // console.log(setupsuccess?.payload?.[0]?.user?.email);
  // console.log(location.pathname);
console.log(user?.Data?.email)
  
  

  useEffect(() => {
    if (!((lowerCase && upperCase && numbers || lowerCase && upperCase && specialChar || numbers && specialChar && upperCase || numbers && specialChar && lowerCase) && charLength) 
    // && !newPassword.length <= 0 
     && focus)  { 
      setToolTip(true) 
    }
    else {
      setToolTip(false)
    }
// console.log("Tooltip", toolTip);
// console.log("newPassword", newPassword);

if (newPassword.length < 8) { 
  setCharLength(false)
}
else {
  setCharLength(true)
}

if (!regexLowerCase.test(newPassword)) { 
  setLowerCase(false)
}
else {
  setLowerCase(true)
}

if (!regexUpperCase.test(newPassword)) { 
  setUpperCase(false)
}
else {
  setUpperCase(true)
}

if (!regexNumbers.test(newPassword)) { 
  setNumbers(false)
}
else {
  setNumbers(true)
}

if (!regexSpecialChar.test(newPassword)) { 
  setSpecialChar(false)
}
else {
  setSpecialChar(true)
}

if (lowerCase && upperCase && numbers || lowerCase && upperCase && specialChar || numbers && specialChar && upperCase || numbers && specialChar && lowerCase) {
  setThreeConditions(true)
}
else {
  setThreeConditions(false)
}


// console.log("----" , focus)
}, [newPassword, lowerCase, upperCase, numbers, specialChar, charLength, focus])
  

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    width: "280px",
    //   customClass: 'swal-wide',
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErr(false)
    setToolTip(false)
    //change newPassword in manage storefront
    if (location.pathname === "/change-pass") {
      if (((lowerCase && upperCase && numbers || lowerCase && upperCase && specialChar || numbers && specialChar && upperCase || numbers && specialChar && lowerCase) && charLength) && !newPassword.length <= 0 ) {
        if (confirmPassword === newPassword) {
          dispatch(changePass(currentPassword, newPassword)).then((res) => {
            if (res.type === "CHANGE_PASSWORD_ERROR") {
              // console.log("ERROR", res.payload.data.message);
              // console.log("ERROR", res);
              Toast.fire({
                icon: "error",
                title: `${res.payload.data.message}`,
              });
            }
            if (res.type === "CHANGE_PASSWORD_SUCCESS") {
              // console.log("successful change pass", res);
              navigate("/password-changed-successful");
              setTimeout(() => {
                navigate("/dashboard");
              }, 3000);
              Toast.fire({
                icon: "success",
                title: `Password Changed!`,
              });
            }
          });
        } else {
          setShowErr(true)
          Toast.fire({
            icon: "error",
            title: `Passwords Do Not Match!`,
          });
        }
      } else {
      
        Toast.fire({
          icon: "error",
          title: `Wrong Password Pattern!`,
        });
        setToolTip(true)
      }
    }
    //reset newPassword from forget newPassword being logout
    else {
      // console.log(regexPass.test(newPassword));
      if (((lowerCase && upperCase && numbers || lowerCase && upperCase && specialChar || numbers && specialChar && upperCase || numbers && specialChar && lowerCase) && charLength) && !newPassword.length <= 0) {
        if (confirmPassword === newPassword) {
          dispatch(forgotPassword(token, newPassword)).then((res) => {
            if (res.type === "FORGOT_PASSWORD_ERROR") {
              console.log("ERROR", res);
              Toast.fire({
                icon: "error",
                title: `${res.payload.data.message}`,
              });
            }
            if (res.type === "FORGOT_PASSWORD_SUCCESS") {
              // console.log("successful change pass", res);
              navigate("/password-changed-successful");
              setTimeout(() => {
                navigate("/login");
              }, 3000);
              Toast.fire({
                icon: "success",
                title: `Password Reset!`,
              });
            }
          });
        } else {
          setShowErr(true)
          Toast.fire({
            icon: "error",
            title: `Passwords Do Not Match!`,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: `Wrong Password Pattern!`,
        });
        setToolTip(true)
      }
    }
    // console.log(forgotPassword, "ACTION")
    // if (regexPass.test(newPassword)) {
    //   forgotPassword(token, newPassword);
    //   Toast.fire({
    //     icon: "success",
    //     title: `Password Changed Successfully`,
    //   });

    // }

    // else {
    //   e.preventDefault();
    // Toast.fire({
    //   icon: "error",
    //   title: `Wrong Pattern`,
    // });
    // }
  };

  return (
    <div
      id="changePass"
      className="h-screen"
      style={{
        background: "rgb(237, 240, 243)",
      }}
    >
      <div className="changepassword">
        <div>
          <div
            className="spimg px-0 rounded-b-none "
            style={{ padding: "14px 11px 12px 11px" }}
          >
            <img
              src="/images/logos/small.png"
              className="simg  w-auto  "
              style={{ transition: "margin-top 0.4s", height: "55px" }}
            />
            <div
              style={{ fontSize: "22px" }}
              className="font-normal text-black mt-0 cstm-1"
            >
              Change Password
            </div>
          </div>
        </div>
        <span>
       { showErr &&   <div
            className="confirmErrDiv"
            style={{ transition: "all 0.2s ease 0s" }}
          >
            <span className="animated fadeInUp">
              Please ensure the password and the confirmation are the same.
            </span>
          </div> }

          
        </span>
        <div>
          <div className="flex justify-center align-items-center relative">
            <form className="authform  " style={{ marginTop: "30px" }}>
              <p className="pass-alternative  ">
                Enter a new password for <br />
                {location.pathname === "/change-pass"
                  ? user?.Data?.email
                  : email}
              </p>

             
              

              <div
                className=""
                style={{ padding: "0px 30px", marginBottom: "10px" }}
              >
                {location.pathname === "/change-pass" ? (
                  <div className="authinput ">
                    <div className="authinput-wrap items-center">
                      <div className=" px-3.5 ">
                        <span>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            width="13px"
                            height="13px"
                            viewBox="0 0 13 16"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="auth0-lock-icon auth0-lock-icon-box "
                          >
                            <div></div>
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(-288.000000, -1508.000000)"
                                fill="#666"
                              >
                                <path
                                  style={{ fill: "#666" }}
                                  d="M299,1523.998 L290,1523.998 C288.896,1523.998 288,1523.102 288,1521.999 L288,1515.999 C288,1514.895 288.896,1513.998 290,1513.998 L290,1513.998 L290,1512.499 C290,1510.015 292.015,1507.999 294.5,1507.999 C296.985,1507.999 299,1510.015 299,1512.499 L299,1513.999 C300.104,1513.999 301,1514.895 301,1515.999 L301,1521.999 C301,1523.103 300.104,1523.998 299,1523.998 L299,1523.998 Z M298,1512.499 C298,1510.566 296.433,1508.999 294.5,1508.999 C292.567,1508.999 291,1510.566 291,1512.499 L291,1513.998 L298,1513.998 L298,1512.499 L298,1512.499 Z M300,1515.999 C300,1515.446 299.552,1514.998 299,1514.998 L290,1514.998 C289.447,1514.998 289,1515.446 289,1515.999 L289,1521.999 C289,1522.551 289.447,1522.998 290,1522.998 L299,1522.998 C299.552,1522.998 300,1522.551 300,1521.999 L300,1515.999 L300,1515.999 Z M294.5,1520.998 C294.224,1520.998 294,1520.774 294,1520.498 L294,1517.498 C294,1517.223 294.224,1516.999 294.5,1516.999 C294.776,1516.999 295,1517.223 295,1517.498 L295,1520.498 C295,1520.774 294.776,1520.998 294.5,1520.998 L294.5,1520.998 Z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </div>

                      <input
                        id="currentPassword"
                        className="authinput-inp placeholder:text-gray-500 cstm-1"
                        placeholder="enter your current password"
                        type="password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="authinput relative" style={{ marginBottom: "10px" }}>
                  <div data-content="" className={`authinput-wrap items-center  `}>
                    <div className="px-3.5 tooltips">
                      <span>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="13px"
                          height="13px"
                          viewBox="0 0 13 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          className="auth0-lock-icon auth0-lock-icon-box"
                        >
                          <g
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(-288.000000, -1508.000000)"
                              fill="#666"
                            >
                              <path
                                style={{ fill: "#666" }}
                                d="M299,1523.998 L290,1523.998 C288.896,1523.998 288,1523.102 288,1521.999 L288,1515.999 C288,1514.895 288.896,1513.998 290,1513.998 L290,1513.998 L290,1512.499 C290,1510.015 292.015,1507.999 294.5,1507.999 C296.985,1507.999 299,1510.015 299,1512.499 L299,1513.999 C300.104,1513.999 301,1514.895 301,1515.999 L301,1521.999 C301,1523.103 300.104,1523.998 299,1523.998 L299,1523.998 Z M298,1512.499 C298,1510.566 296.433,1508.999 294.5,1508.999 C292.567,1508.999 291,1510.566 291,1512.499 L291,1513.998 L298,1513.998 L298,1512.499 L298,1512.499 Z M300,1515.999 C300,1515.446 299.552,1514.998 299,1514.998 L290,1514.998 C289.447,1514.998 289,1515.446 289,1515.999 L289,1521.999 C289,1522.551 289.447,1522.998 290,1522.998 L299,1522.998 C299.552,1522.998 300,1522.551 300,1521.999 L300,1515.999 L300,1515.999 Z M294.5,1520.998 C294.224,1520.998 294,1520.774 294,1520.498 L294,1517.498 C294,1517.223 294.224,1516.999 294.5,1516.999 C294.776,1516.999 295,1517.223 295,1517.498 L295,1520.498 C295,1520.774 294.776,1520.998 294.5,1520.998 L294.5,1520.998 Z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <input
                    onFocus={e => setFocus(true)}
                    onBlur={e => setFocus(false)}
                      type="password"
                      id="password"
                      className=" authinput-inp placeholder:text-gray-500 cstm-1"
                      placeholder="your new password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                  </div>
                </div>

 
             {      focus &&
              <div id="pswd_info" style={{bottom: "193px",  }} className={`tooltp p-3  ${toolTip ? "opacity-100" : "opacity-0 -z-30"} `}>
                <div className={`tooltp-content -mb-4 transition ease-in-out duration-500 ${toolTip ? "opacity-100" : "opacity-0 "}`}>
                  <li className={`mb-1 duration-500 ${charLength ? "text-lime-500" : "text-red-500"}`}>
                     
                    <p className="mb-0">At least 8 characters in length</p>
                  </li>
                  <li className={`mb-1 duration-500 ${threeConditions ? "text-lime-500" : "text-red-500"}`}>
                
                    <p className="mb-0">
                      Contain at least 3 of the following 4 types of characters:
                    </p>
                  </li>
                  <ul className={`mb-0 ${location.pathname === "/signup" ? "pl-4" : "pl-0"}`}>
                    <li className={`mb-1 duration-500 ${lowerCase ? "text-lime-500" : ""}`}>
                      <p className="mb-0">Lower case letters (a-z)</p>
                    </li>
                    <li className={`mb-1 ${upperCase ? "text-lime-500" : ""}`}>
                  
                      <p className="mb-0">Upper case letters (A-Z)</p>
                    </li>
                    <li className={`mb-1 duration-500 ${numbers ? "text-lime-500" : ""}`}>
                    
                      <p className="mb-0">Numbers (i.e. 0-9)</p>
                    </li>
                    <li className={`mb-1 duration-500 ${specialChar ? "text-lime-500" : ""}`}>
                    
                      <p className="mb-0">Special Characters (e.g. !@#$%^&*)</p>
                    </li>
                  </ul>
                </div>
                <div className="arrow-down"></div>
              </div> }



                <div className="authinput mb-0">
                  <div className="authinput-wrap items-center">
                    <div className=" px-3.5 ">
                      <span>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="13px"
                          height="13px"
                          viewBox="0 0 13 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          className="auth0-lock-icon auth0-lock-icon-box "
                        >
                          <div></div>
                          <g
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(-288.000000, -1508.000000)"
                              fill="#666"
                            >
                              <path
                                style={{ fill: "#666" }}
                                d="M299,1523.998 L290,1523.998 C288.896,1523.998 288,1523.102 288,1521.999 L288,1515.999 C288,1514.895 288.896,1513.998 290,1513.998 L290,1513.998 L290,1512.499 C290,1510.015 292.015,1507.999 294.5,1507.999 C296.985,1507.999 299,1510.015 299,1512.499 L299,1513.999 C300.104,1513.999 301,1514.895 301,1515.999 L301,1521.999 C301,1523.103 300.104,1523.998 299,1523.998 L299,1523.998 Z M298,1512.499 C298,1510.566 296.433,1508.999 294.5,1508.999 C292.567,1508.999 291,1510.566 291,1512.499 L291,1513.998 L298,1513.998 L298,1512.499 L298,1512.499 Z M300,1515.999 C300,1515.446 299.552,1514.998 299,1514.998 L290,1514.998 C289.447,1514.998 289,1515.446 289,1515.999 L289,1521.999 C289,1522.551 289.447,1522.998 290,1522.998 L299,1522.998 C299.552,1522.998 300,1522.551 300,1521.999 L300,1515.999 L300,1515.999 Z M294.5,1520.998 C294.224,1520.998 294,1520.774 294,1520.498 L294,1517.498 C294,1517.223 294.224,1516.999 294.5,1516.999 C294.776,1516.999 295,1517.223 295,1517.498 L295,1520.498 C295,1520.774 294.776,1520.998 294.5,1520.998 L294.5,1520.998 Z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </div>
                    <input
                      id="confirmpassword"
                      className="authinput-inp placeholder:text-gray-500 cstm-1"
                      placeholder="confirm your new password"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>
                </div>





              </div>
              <div className="" style={{ marginTop: "30px" }}>
                {!forgotPass?.loading ? (
                  <button
                    onClick={handleSubmit}
                    className="sp-btn "
                    style={{
                      backgroundColor: "rgb(106, 121, 52)",
                      width: "100%",
                      border: "0",
                    }}
                    type="submit"
                  >
                    <div className="submit-btn flex justify-center">
                      <span
                        className=" duration-300 ease-out hover:scale-110 cstm-1"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          className="icon-text"
                          style={{
                            border: "2px solid white",
                            width: "40px",
                            height: "40px",
                            padding: "12px",
                            "border-radius": "50%",
                          }}
                          width="8px"
                          height="12px"
                          viewBox="0 0 8 12"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            id="Symbols"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="Web/Submit/Active"
                              transform="translate(-148.000000, -32.000000)"
                              fill="#FFFFFF"
                            >
                              <polygon
                                id="Shape"
                                points="148 33.4 149.4 32 155.4 38 149.4 44 148 42.6 152.6 38"
                              ></polygon>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </button>
                ) : (
                  <div
                    style={{
                      backgroundColor: "#eee",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "14px",
                      borderRadius: "0 0 5px 5px",
                    }}
                  >
                    <ClipLoader color="#212529" className="loader" />
                  </div>
                )}
              </div>
            </form>
            <div className="shieldIcon my-7" style={{ bottom: "-75px" }}>
              <a href="https://auth0.com/" className="auth0-lock-badge">
                <span>
                  <svg
                    width="18px"
                    height="21px"
                    viewBox="0 0 18 21"
                    version="1.1"
                    // xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                        sketchType="MSPage"
                    >
                      <g
                        id="Lock"
                        sketchType="MSArtboardGroup"
                        transform="translate(-276.000000, -3229.000000)"
                        fillOpacity="0.4"
                        fill="#FFFFFF"
                      >
                        <g
                          id="SMS"
                            sketchType="MSLayerGroup"
                          transform="translate(153.000000, 3207.000000)"
                        >
                          <g
                            id="Group"
                              sketchType="MSShapeGroup"
                          >
                            <g
                              id="Header"
                              transform="translate(-0.500000, 0.000000)"
                            >
                              <path
                                d="M137.790429,38.4848167 L135.770249,32.1883757 L141.058325,28.2980192 L134.521693,28.2980192 L132.501273,22.001821 L132.500673,22.0001214 L139.038385,22.0001214 L141.059165,28.2974122 L141.059165,28.2972908 L141.060843,28.2963196 C142.234586,31.9495762 141.025835,36.1047125 137.790429,38.4848167 L137.790429,38.4848167 L137.790429,38.4848167 Z M127.211877,38.4848167 L127.210199,38.4860307 L132.499714,42.3773585 L137.790429,38.4849381 L132.501393,34.593489 L127.211877,38.4848167 L127.211877,38.4848167 Z M123.942542,28.296441 L123.942542,28.296441 C122.707175,32.147463 124.141203,36.2280579 127.210798,38.4855451 L127.211278,38.4836027 L129.231698,32.1875259 L123.9447,28.2978978 L130.479774,28.2978978 L132.500314,22.0016996 L132.500793,22 L125.962722,22 L123.942542,28.296441 L123.942542,28.296441 Z"
                                id="Shape"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
