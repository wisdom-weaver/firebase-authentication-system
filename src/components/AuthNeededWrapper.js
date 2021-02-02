import { Component } from "materialize-css";
import React from "react";
import { connect } from "react-redux";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import { compose } from "redux";
import ErrorCard from "../components/ErrorCard";
import login_ill from "../static/illustrations/login_ill.svg";

function AuthNeededWrapper(props) {
  const history = useHistory();
  const { isAuthenticated } = props;

  return (
    <div className="Page GamePage">
      {isAuthenticated && ( props.children )}
      {!isAuthenticated && (
        <>
          <div className="container w-100">
            <ErrorCard>
              <div className="img-container">
                <img src={login_ill} />
              </div>
              <h5 className="center">
                Please{" "}
                <NavLink className="link accent2-text" to="/login">
                  {" "}
                  Login{" "}
                </NavLink>{" "}
                continue
              </h5>
            </ErrorCard>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: (state.firebase.auth.uid && true) || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AuthNeededWrapper);
