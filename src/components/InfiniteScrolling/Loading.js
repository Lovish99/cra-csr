import React from "react";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="lds-ripple">
        <div>Loading ....</div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
