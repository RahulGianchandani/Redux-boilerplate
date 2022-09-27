import "./signup.css";

import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/login.action";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";


const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state);
  const [errors, setErrors] = useState("");
  const [showError, setShowError] = useState(false);
  const [sentMsg, setSentMsg] = useState("");
  // const location = useLocation()
  // console.log("messege sent" ,sentMsg)
  const logininfunction = (values) => {
    setShowError(false);
    setSentMsg(false)
    dispatch(loginUser(values.email, values.password)).then(async (res) => {
      if (res.type === "LOGIN_USER_ACCOUNT_ERROR") {
        setErrors(res?.payload?.data?.message);
        setShowError(true);
        
        // notification("error", "Login Error", res.payload.data.data);
      }
      else {
        
        setShowError(false);
        setErrors("");
        // navigate("/", { replace: true });
        window.location.href = '/'
      }
        // if (res?.payload?.message?.account_type=="admin") {
        //   // console.log(login?.payload?.[0]?.message?.account_type)

        //   setShowError(false);
        //   setErrors("");
        //   navigate("/brands", { replace: true });
        // } else if (res?.payload?.message?.setupSuccess == 1) {
        //   navigate("/",{state:{video:res?.payload?.message?.video}});}
        //  else {
        //   setShowError(false);
        //   setErrors("");
        //   navigate("/", { replace: true });
        // }
      
    });
  };

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid").required("Can't be blank"),

      password: Yup.string()

        .min(6)
        .required("Can't be blank")

        .min(3)
        .required(),
    }),
    onSubmit: function (values) {
      logininfunction(values);
    },
  });

  useEffect(() => {
    document.title = "Sign In"
    setSentMsg(location?.state?.sentMsg)
  }, [])


 
  return (
    <div
      className="h-screen"
      style={{
        background: " radial-gradient(#40404b, #111118) rgba(34,34,40,0.94)",
      }}
    >
      <div className="signup tracking-tight" style={{}}>
        <div>
           <div className="spimg px-0 " style={{padding: "18px 11px 12px 11px"}}>
            <img
              src="/images/logos/small.png"
              className="simg  w-auto  "
              style={{ transition: "margin-top 0.4s", height: "42px" }}
            />
            <div
              style={{ fontSize: "22px" }}
              className="font-normal text-black mt-1 cstm-1"
            >
              {/* FASCOM CONNECT LOGIN */}
              Longaberger Family Login
            </div>
          </div>
        </div>
        {showError && (
          <div
            style={{
              backgroundColor: "#ff3e00" ,
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            <p id="loginErrorMsg " style={{
               color: "#fff",
               textAlign: "center",
               padding: "10px",
               lineHeight: "1.8",
               fontSize: "11px",
               fontWeight: "700",
               textTransform: "uppercase",
               fontFamily: "Avenir Next, Avenir, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif",
               marginBottom: "0"
            }} className="animated fadeInUp"
            >
              EMAIL ADDRESS / PASSWORD COMBINATION INCORRECT, TRY AGAIN OR CLICK
              ON THE "DON’T REMEMBER YOUR PASSWORD?" LINK. IF YOU CONTINUE TO
              HAVE TECHNICAL ISSUES PLEASE CONTACT SUPPORT@LONGABERGER.COM.
            </p>
          </div>
        )}
        {
          sentMsg && (
            <div
            
              style={{
                backgroundColor: "#7ed321" ,
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
               
              }}
            >
              <p id="loginErrorMsg" className="animated fadeInUp mb-0" style={{
               color: "#fff",
               textAlign: "center",
               padding: "10px",
               lineHeight: "1.8",
               fontSize: "11px",
               fontWeight: "700",
               textTransform: "uppercase",
               fontFamily: "Avenir Next, Avenir, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, sans-serif",
               marginBottom: "0"
            }}
              
              >
                WE'VE JUST SENT YOU AN EMAIL TO RESET YOUR PASSWORD.
              </p>
            </div>
          )
        }
        {/* {
          location.state.change==true &&    <div
          style={{
            backgroundColor: "#ff3e00" ,
            color: "#fff",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          <p id="loginErrorMsg"
          >
           WE'VE JUST SEND YOU AN EMAIL TO RESET YOUR PASSWORD.
          </p>
        </div>
        } */}
        {/* <div className="authwrapper">
          <div className="authwrapper-btn text-center">
            <div
              className="  col-6 cursor-default cstm-1"
              onClick={() => navigate("/", { replace: true })}
              style={{ color: "#5c666f", boxShadow: "0 1px 0 0 #5c666f", padding:"11px 0px" }}
            >
              Log In
            </div>
            <div
              className="  col-6 cursor-pointer cstm-1"
              style={{ color: "rgba(92,102,111,0.6)", padding:"11px 0px" }}
              onClick={() => navigate("/signup", { replace: true })}
            >
              Sign Up
            </div>
          </div>
        </div> */}
        <form className="authform" onSubmit={formik.handleSubmit}>
          <div className="" style={{ padding: "0px 20px" }}>
            <div className="authinput">
              <div
                className="authinput-wrap items-center "
                style={formik.errors.email && { borderColor: "red" }}
              >
                <div className=" px-3.5" >
                  <span>
                    <svg
                   
                      aria-hidden="true"
                      focusable="false"
                      width="13px"
                      height="13px"
                      viewBox="0 0 32 26"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
                      className="auth0-lock-icon auth0-lock-icon-box"
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
                          id="32px"
                          sketchType="MSLayerGroup"
                          transform="translate(-2155.000000, -2317.000000)"
                          fill="#373A39"
                        >
                          <g
                            id="Group-856"
                            transform="translate(1.000000, 1.000000)"
                            sketchType="MSShapeGroup"
                          >
                            <path
                              style={{ fill: "#888" }}
                              id="Fill-419"
                              d="M2184,2339 C2184,2339.55 2183.55,2340 2183,2340 L2157,2340 C2156.45,2340 2156,2339.55 2156,2339 L2156,2319 C2156,2318.45 2156.45,2318 2157,2318 L2183,2318 C2183.55,2318 2184,2318.45 2184,2319 L2184,2339 L2184,2339 Z M2184,2316 L2156,2316 C2154.89,2316 2154,2316.89 2154,2318 L2154,2340 C2154,2341.1 2154.89,2342 2156,2342 L2184,2342 C2185.1,2342 2186,2341.1 2186,2340 L2186,2318 C2186,2316.89 2185.1,2316 2184,2316 L2184,2316 Z M2176,2322 L2180,2322 L2180,2326 L2176,2326 L2176,2322 Z M2174,2328 L2182,2328 L2182,2320 L2174,2320 L2174,2328 Z M2158,2332 L2172,2332 L2172,2330 L2158,2330 L2158,2332 Z M2158,2336 L2172,2336 L2172,2334 L2158,2334 L2158,2336 Z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                </div>
                <input
                  id="email"
                  className="authinput-inp placeholder:text-gray-500 cstm-1"
                  placeholder="your@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p style={{ color: "red", fontWeight: "400" }}>
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="authinput mb-0">
              <div
                className="authinput-wrap items-center"
                style={formik.errors.password && { borderColor: "red" }}
              >
                <div className=" px-3.5">
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
                          fill="#888888"
                        >
                          <path  style={{ fill: "#888" }}
                           d="M299,1523.998 L290,1523.998 C288.896,1523.998 288,1523.102 288,1521.999 L288,1515.999 C288,1514.895 288.896,1513.998 290,1513.998 L290,1513.998 L290,1512.499 C290,1510.015 292.015,1507.999 294.5,1507.999 C296.985,1507.999 299,1510.015 299,1512.499 L299,1513.999 C300.104,1513.999 301,1514.895 301,1515.999 L301,1521.999 C301,1523.103 300.104,1523.998 299,1523.998 L299,1523.998 Z M298,1512.499 C298,1510.566 296.433,1508.999 294.5,1508.999 C292.567,1508.999 291,1510.566 291,1512.499 L291,1513.998 L298,1513.998 L298,1512.499 L298,1512.499 Z M300,1515.999 C300,1515.446 299.552,1514.998 299,1514.998 L290,1514.998 C289.447,1514.998 289,1515.446 289,1515.999 L289,1521.999 C289,1522.551 289.447,1522.998 290,1522.998 L299,1522.998 C299.552,1522.998 300,1522.551 300,1521.999 L300,1515.999 L300,1515.999 Z M294.5,1520.998 C294.224,1520.998 294,1520.774 294,1520.498 L294,1517.498 C294,1517.223 294.224,1516.999 294.5,1516.999 C294.776,1516.999 295,1517.223 295,1517.498 L295,1520.498 C295,1520.774 294.776,1520.998 294.5,1520.998 L294.5,1520.998 Z"></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                </div>
                <input
                  id="password"
                  className="authinput-inp placeholder:text-gray-500 cstm-1"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p style={{ color: "red", fontWeight: "400" }}>
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>
          {/* {!login?.loading && ( */}
            <p className="pass-alternative py-3 mb-0">
              <Link
                className="pass-alternative-link cstm-1"
                to="/reset-password"
                style={{ fontSize: "13px", color: "rgba(0,0,0,0.87)" }}
              >
                Don't remember your password?
              </Link>
            </p>
          {/* )} */}
          {!login?.loading ? (
            <button
              className="sp-btn"
              style={{
                backgroundColor: "rgb(0,165,215)",
                width: "100%",
                border: "0",
              }}
              type="submit"
            >
              <div className="submit-btn">
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
                  Log In
                  {/* <FaGreaterThan color="#fff" height={12} style={{ paddingLeft: "5px" }} /> */}
                  <span className="ml-2">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className="icon-text"
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
        </form>
      </div>
    </div>
  );
};

export default Login;
