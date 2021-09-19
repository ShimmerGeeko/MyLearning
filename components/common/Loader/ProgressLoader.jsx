import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import './ProgressLoader.css';

export const ProgressLoader = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="loader">
        {/* <Loader type="ThreeDots" color="#673AB7" height="100" width="100" /> */}
        {/* <Loader type="Oval" color="#673AB7" height="80" width="80" /> */}
        <Loader type="TailSpin" color="#673AB7" height="70" width="70" />
      </div>
    )
  );
};