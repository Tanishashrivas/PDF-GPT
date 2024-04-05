import React, { useState, useRef } from "react";
import FileUpload from "./FileUpload";
import axios from "axios";

function PdfUpload() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handlePdfUpload = async () => {
    console.log("Uploading PDF...");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("pdf", file);

        const response = await axios.post("/upload/pdf", formData);
        console.log("PDF uploaded successfully:", response.data);

        // Clear the file after successful upload
        setFile(null);
      } catch (error) {
        console.error("Error uploading PDF:", error);
        alert("Error uploading PDF.");
      }
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      /> */}
      <FileUpload onFileUpload={handlePdfUpload} />
    </>
  );
}

export default PdfUpload;
