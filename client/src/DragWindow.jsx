// DragWindow.jsx
import React, { useState } from "react";
import PdfUpload from "./PdfUpload";

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
    const file = files[0]; // Only handle the first file
    if (file.type === "application/pdf") {
      uploadFile(file);
    } else {
      alert("Please drop only PDF files.");
    }
  };

  const uploadFile = (file) => {
    // Perform file upload logic here (e.g., using fetch or Axios)
    console.log("Uploading file:", file.name);
    // Assuming this function is available in PdfUpload
    PdfUpload.handlePdfUpload(file);
  };

  return (
    <div
      className="uploadWindow"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <PdfUpload />
      <div className="drag-text">Drag & Drop PDF file here</div>
    </div>
  );
}

export default DragWindow;
