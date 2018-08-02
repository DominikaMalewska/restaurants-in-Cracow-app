import React from "react";

const Error = () => {
  return (
    <div className="api-failure">
      <div className="alert-icon" />
      <p className="alert-text">Sorry, the data could not be loaded.</p>
      <p className="alert-text">See the JavaScript console for technical details.</p>
    </div>
  );
};

export default Error;
