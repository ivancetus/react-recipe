import React from "react";
import { Link } from "react-router-dom";
import leftImage from "../images/leftImage.jpg"
import rightImage from "../images/rightImage.jpg"

export default () => {
  return (
    <div className="vw-100 vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="marvel position-relative">
        <img
          src={leftImage}
          alt="image missing"
          className="img-fluid"
        />
      </div>
      <div className="p-5">
        <div className="container secondary-color text-center">
          <h1 className="display-4">Food Recipes</h1>
          <p className="lead">
            A curated list of recipes for the best homemade meal and delicacies.
          </p>
          <hr className="my-4" />
          <Link
            to="/recipes"
            className="btn btn-lg custom-button"
            role="button"
          >
            View Recipes
          </Link>
        </div>
      </div>
      <div className="marvel position-relative">
        <img
          src={rightImage}
          alt="image missing"
          className="img-fluid"
        />
      </div>
    </div>
  );
};