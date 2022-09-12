import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <p>Uploading...</p>
      <div className="loaderLine">
        <div className="movingLine"></div>
      </div>
    </div>
  );
};

export default Loader;
