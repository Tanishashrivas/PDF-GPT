import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function FileUpload() {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    console.log("Uploaded file:", uploadedFile); // Debug statement to check console
    if (uploadedFile) {
      // console.log("Uploading file...");
      try {
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const response = await axios.post("http://localhost:3000/upload/pdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("File uploaded successfully:", response.data);
        console.log("File uploaded successfully:", response.data);
        // onFileUpload(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file.");
      }
    }
    //  else {
    //   alert("Please select a file.");
    // }
  };
  
  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} 
        onChange={handleFileUpload}
      />
      <button onClick={handleClickUpload}className="uploadPdf"><FontAwesomeIcon icon={faUpload} /> Upload </button>
    </>
  );
}

export default FileUpload;
