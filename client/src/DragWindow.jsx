import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./FileUpload";

function DragWindow() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const file = files[0]; // Only handling the first file
    if (file.type === "application/pdf") {
      uploadFile(file);
    } else {
      alert("Please select a pdf file.");
    }
  };

  const uploadFile = async(file) => {
    console.log("Uploading file:", file);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("http://localhost:3000/upload/pdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("File uploaded successfully:", response.data);
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file.");
      }
    }
    
  };

  return (
    <div
      className="uploadWindow"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FileUpload />
      <div className="drag-text">Drag & Drop PDF file here</div>
    </div>
  );
}

export default DragWindow;
