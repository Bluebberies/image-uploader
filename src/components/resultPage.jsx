import React from "react";
import { toast } from "react-toastify";

const ResultPage = ({ image_url, handleRefresh }) => {
  const handleLinkCopy = () => {
    navigator.clipboard
      .writeText(image_url)
      .then(() => toast.success("Copied"))
      .catch((ex) => console.log(ex));
  };

  return (
    <div className="resultWrapper">
      <div className="checkIcon">
        <i className="fa-solid fa-check"></i>
      </div>
      <p>Uploaded Successfully!</p>
      <img src={image_url} alt="upload" />
      <div className="linkInput">
        <input type="text" value={image_url} readOnly={true} />
        <button onClick={handleLinkCopy}>copy link</button>
      </div>
      <button className="refresh" onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
};

export default ResultPage;
