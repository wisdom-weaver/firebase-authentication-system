import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import { compose } from "redux";
import TextInputField from "../components/TextInputField";
import {
  authMessageResetAction,
  loginAction,
  logoutAction,
} from "../store/actions/authActions";
import { validateEmail, validatePassword } from "../utils/validation";

function Login(props) {
  const { login, logout, authMessageReset } = props;
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailBlur, setEmailBlur] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordBlur, setPasswordBlur] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitLoginForm = (e) => {
    e.preventDefault();
    setEmailBlur(true);
    setPasswordBlur(true);
    if(validateEmail(email).isValid && validatePassword(password).isValid)
      login({ email, password });
  };
  const logoutBtnClick = () => {
    logout();
  };

  const { authMessage, authError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authMessage == "LOGIN_SUCCESS") {
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
            <span className="headTitle">Authentication</span>
          </div>
          <div className="auth-message-display ">
            <div className="content-container">
              {authMessage == "LOGIN_SUCCESS" && (
                <div className="log-box success">
                  <p className="center"> You are successfully logged in </p>
                </div>
              )}
              {authMessage == "LOGIN_ERROR" && (
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
                  <div className="col s12">
                    <TextInputField
                      id="login-email"
                      label="Email"
                      type={"text"}
                      valid={{
                        ...validateEmail(email),
                        ...(authMessage == "LOGIN_ERROR"? {isValid: false}: {})
                      }}
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
                      type={passwordVisible?"text":"password"}
                      valid={validatePassword(password)}
                      value={password}
                      setValue={setPassword}
                      blur={passwordBlur}
                      passwordVisible={passwordVisible}
                      setPasswordVisible={setPasswordVisible}
                      setBlur={setPasswordBlur}
                    />
                  </div>
                </div>
                <div className="auth-action col-padding row-flex justify-space-between">
                  <div className="">
                    <button className="btn auth-btn" onClick={submitLoginForm}>Login</button>
                  </div>
                  <div className="">
                    {/* <a className="link">Forgot Password ?</a> */}
                    <br />
                    <NavLink to="/signup"
                    className="link"
                    >Not Signed Up ?</NavLink>
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
    login: (creds) => {
      dispatch(loginAction(creds));
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
)(Login);
