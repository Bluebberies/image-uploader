import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ handleFileSelect }) {
  const { getRootProps, getInputProps, open, acceptedFiles, isDragActive } =
    useDropzone({
      noClick: true,
      noKeyboard: true,
    });
  const rootProps = useDropzone({ noDragEventsBubbling: true });

  const files = acceptedFiles[0];

  useEffect(() => {
    handleFileSelect(files);
  }, [files]);

  const checkIsDragActive = () => {
    if (isDragActive) return "dragActive";
  };

  return (
    <div className="wrapper">
      <p className="title">Upload your image</p>
      <h4>File should be Jpeg, Png,...</h4>
      <div className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className={`dropbox ${checkIsDragActive()}`}>
            <p>Drag & Drop your image here</p>
          </div>
        </div>
        <div className="button">
          <p className="or">or</p>
          <button
            {...rootProps.getRootProps({ className: "dropzone" })}
            type="button"
            onClick={open}
          >
            Choose a file
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dropzone;
