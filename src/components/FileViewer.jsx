// src/components/FileViewer.js
import React from "react";

const FileViewer = ({ file }) => {
  return (
    <div className="file-viewer">
      <h3>{file.name}</h3>
      <pre>{file.content}</pre>
    </div>
  );
};

export default FileViewer;
