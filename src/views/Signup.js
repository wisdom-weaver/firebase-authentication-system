import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import { compose } from "redux";
import TextInputField from "../components/TextInputField";
import {
  authMessageResetAction,
  loginAction,
  logoutAction,
  signupAction,
} from "../store/actions/authActions";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";

function Signup(props) {
  const { signup, logout, authMessageReset } = props;
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailBlur, setEmailBlur] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [firstName, setFirstName] = useState();
  const [firstNameBlur, setFirstNameBlur] = useState(false);

  const [lastName, setLastName] = useState();
  const [lastNameBlur, setLastNameBlur] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmPasswordBlur, setConfirmPasswordBlur] = useState(false);

  const submitSignupForm = (e) => {
    e.preventDefault();
    setEmailBlur(true);
    setPasswordBlur(true);
    setConfirmPasswordBlur(true);
    setFirstNameBlur(true);
    setLastNameBlur(true);
    if (
      validateEmail(email).isValid &&
      validatePassword(password).isValid &&
      validateName(firstName).isValid &&
      validateName(lastName).isValid &&
      validateConfirmPassword(password, confirmPassword).isValid
    )
      signup({ email, password, firstName, lastName });
  };
  const logoutBtnClick = () => {
    logout();
  };

  const { authMessage, authError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authMessage == "SIGNUP_SUCCESS") {
      setTimeout(() => {
        authMessageReset();
        history.push("/");
      }, 3000);
    }
  }, [authMessage]);
  return (
    <div className="flexPage">
      <div className="container">
        <div className="card auth-card">
          <div className="accent-banner">
            <span className="headTitle">Register</span>
          </div>
          <div className="auth-message-display ">
            <div className="content-container">
              {authMessage == "SIGNUP_SUCCESS" && (
                <div className="log-box success">
                  <p className="center"> You are successfully signed up </p>
                </div>
              )}
              {authMessage == "SIGNUP_ERROR" && (
                <div className="log-box error">
                  <p className="center"> {authError} </p>
                </div>
              )}
            </div>
          </div>
          <div className="auth-form-container">
            <div className="content-container">
              <form>
                <div className="row">
                  <div className="col s6">
                    <TextInputField
                      id="signup-firstName"
                      label="First Name"
                      type={"text"}
                      valid={validateName(firstName)}
                      value={firstName}
                      setValue={setFirstName}
                      blur={firstNameBlur}
                      setBlur={setFirstNameBlur}
                    />
                  </div>
                  <div className="col s6">
                    <TextInputField
                      id="signup-lastName"
                      label="Last Name"
                      type={"text"}
                      valid={validateName(lastName)}
                      value={lastName}
                      setValue={setLastName}
                      blur={lastNameBlur}
                      setBlur={setLastNameBlur}
                    />
                  </div>

                  <div className="col s12">
                    <TextInputField
                      id="signup-email"
                      label="Email"
                      type={"text"}
                      valid={validateEmail(email)}
                      value={email}
                      setValue={setEmail}
                      blur={emailBlur}
                      setBlur={setEmailBlur}
                    />
                  </div>
                  <div className="col s12">
                    <TextInputField
                      id="login-password"
                      label="Password"
                      type={passwordVisible ? "text" : "password"}
                      valid={validatePassword(password)}
                      value={password}
                      setValue={setPassword}
                      blur={passwordBlur}
                      passwordVisible={passwordVisible}
                      setPasswordVisible={setPasswordVisible}
                      setBlur={setPasswordBlur}
                    />
                  </div>
                  <div className="col s12">
                    <TextInputField
                      id="signup-confirmPassword"
                      label="Confirm Password"
                      type={passwordVisible ? "text" : "password"}
                      valid={validateConfirmPassword(confirmPassword, password)}
                      value={confirmPassword}
                      setValue={setConfirmPassword}
                      blur={confirmPasswordBlur}
                      setBlur={setConfirmPasswordBlur}
                    />
                  </div>
                </div>
                <div className="auth-action col-padding row-flex justify-space-between">
                  <div className="">
                    <button className="btn auth-btn" onClick={submitSignupForm}>
                      SignUp
                    </button>
                  </div>
                  <div className="">
                    <NavLink to="/login" className="link">
                      Already Registered! Login?
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <button onClick={logoutBtnClick}>Logout</button> */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (creds) => {
      dispatch(signupAction(creds));
    },
    logout: () => {
      dispatch(logoutAction());
    },
    authMessageReset: () => {
      dispatch(authMessageResetAction());
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Signup);
