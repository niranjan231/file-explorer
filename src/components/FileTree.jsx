// src/components/FileTree.js
import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const FileTree = ({
  nodes,
  onSelectFile,
  onCreateFolder,
  onCreateFile,
  onRename,
  onDelete,
}) => {
  return (
    <ul className="file-tree">
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onSelectFile={onSelectFile}
          onCreateFolder={onCreateFolder}
          onCreateFile={onCreateFile}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

const TreeNode = ({ node, onSelectFile, onCreateFolder, onCreateFile, onRename, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    if (node.type === "folder") {
      setExpanded(!expanded);
    } else {
      onSelectFile(node);
    }
  };

  return (
    <li>
      <div className="node">
        {node.type === "folder" ? (
          <span onClick={handleToggle} style={{ cursor: "pointer" }}>
            {expanded ? <FaFolderOpen /> : <FaFolder />}
          </span>
        ) : (
          <span onClick={() => onSelectFile(node)} style={{ cursor: "pointer" }}>
            <FaFile />
          </span>
        )}
        <span onClick={handleToggle} style={{ cursor: "pointer" }}>
          {node.name}
        </span>
        <div className="actions">
          {node.type === "folder" && (
            <>
              <button onClick={() => onCreateFolder(node.id)} title="New Folder">
                <FaPlus />
              </button>
              <button onClick={() => onCreateFile(node.id)} title="New File">
                <FaPlus style={{ color: "green" }} />
              </button>
            </>
          )}
          <button onClick={() => onRename(node.id)} title="Rename">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(node.id)} title="Delete">
            <FaTrash />
          </button>
        </div>
      </div>
      {expanded && node.children && node.children.length > 0 && (
        <ul className="file-tree">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onSelectFile={onSelectFile}
              onCreateFolder={onCreateFolder}
              onCreateFile={onCreateFile}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileTree;
