import { useState, useEffect } from "react";
import React, { useCallback } from "react";
import Dropzone from "./components/dropZone";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import http from "./services/httpService";
import Footer from "./components/footer";
import ResultPage from "./components/resultPage";
import Loader from "./components/loader";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    () => JSON.parse(localStorage.getItem("imageUrl")) || ""
  );
  
  const handleFileChange = async () => {
    if (selectedFile) {
      const fileType =
        selectedFile.type === "image/jpeg" || selectedFile.type === "image/png";
      if (fileType) {
        setLoading(true);
        const fd = new FormData();
        fd.append("avatar", selectedFile, selectedFile.name);
        try {
          const { data } = await http.post(
            "https://imageuploaderbyfrancis.herokuapp.com/",
            fd
          );
          console.log(data);
          setImageUrl(data);
          setLoading(false);
        } catch (ex) {
          console.log(ex);
        }
      } else {
        toast.warn("Invalid File Type");
      }
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    console.log(file);
  };

  const handleRefresh = () => {
    setSelectedFile(null);
    setImageUrl("");
    console.log("hello");
  };

  useEffect(() => {
    handleFileChange();
  }, [selectedFile]);

  useEffect(() => {
    localStorage.setItem("imageUrl", JSON.stringify(imageUrl));
  }, [imageUrl]);

  return (
    <div className="App">
      <ToastContainer />
      {!loading && (
        <div className="card">
          {!imageUrl && <Dropzone handleFileSelect={handleFileSelect} />}
          {imageUrl && (
            <ResultPage image_url={imageUrl} handleRefresh={handleRefresh} />
          )}
        </div>
      )}
      {loading && <Loader />}
      <Footer />
    </div>
  );
}

export default App;
