// src/components/FileExplorer.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileTree from "./FileTree";
import FileViewer from "./FileViewer";
import { addItem, renameItem, deleteItem } from "../redux/fileSlice";

const FileExplorer = () => {
  const fileSystem = useSelector((state) => state.files.fileSystem);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFile = (file) => {
    if (file.type === "file") setSelectedFile(file);
  };

  const handleCreateFolder = (parentId) => {
    const folderName = prompt("Enter folder name:");
    if (!folderName) return;
    const newFolder = {
      id: Date.now(),
      name: folderName,
      type: "folder",
      children: [],
    };
    dispatch(addItem({ parentId, newItem: newFolder }));
  };

  const handleCreateFile = (parentId) => {
    const fileName = prompt("Enter file name:");
    if (!fileName) return;
    const content = prompt("Enter file content:") || "";
    const newFile = {
      id: Date.now(),
      name: fileName,
      type: "file",
      content,
    };
    dispatch(addItem({ parentId, newItem: newFile }));
  };

  const handleRename = (itemId) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    dispatch(renameItem({ itemId, newName }));
  };

  const handleDelete = (itemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
    dispatch(deleteItem(itemId));
    if (selectedFile && selectedFile.id === itemId) {
      setSelectedFile(null);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar: File Tree */}
      <div className="sidebar">
        <h3>File Explorer</h3>
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => handleCreateFolder(null)}>New Folder (Root)</button>
          <button onClick={() => handleCreateFile(null)}>New File (Root)</button>
        </div>
        <FileTree
          nodes={fileSystem}
          onSelectFile={handleSelectFile}
          onCreateFolder={handleCreateFolder}
          onCreateFile={handleCreateFile}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      </div>

      {/* Content Area: File Viewer */}
      <div className="content">
        {selectedFile ? (
          <FileViewer file={selectedFile} />
        ) : (
          <div style={{ fontSize: "1.2rem", color: "#777" }}>
            Select a file from the sidebar to view its content.
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
