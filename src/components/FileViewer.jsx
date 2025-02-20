import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../redux/counterSlice"; 
import FieExplorer from "./FileExplorer";
import "../App.css";

const FileViewer = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [orderedUsers, setOrderedUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Initialize local order from redux state.
  useEffect(() => {
    setOrderedUsers(users);
  }, [users]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowAddUser(true);
  };

  // Toggle dark mode.
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Drag and drop event handlers.
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;
    const newOrder = [...orderedUsers];
    // Remove the dragged user from its original position.
    const [movedUser] = newOrder.splice(draggedIndex, 1);
    // Insert the dragged user at the drop position.
    newOrder.splice(dropIndex, 0, movedUser);
    setOrderedUsers(newOrder);
    setDraggedIndex(null);
  };

  return (
    <div className={`user-1 ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <button 
          className="post-btn" 
          onClick={() => {
            setEditingUser(null);
            setShowAddUser(!showAddUser);
          }}
        >
          {showAddUser ? "Close" : "Post"}
        </button>

        {/* Dark Mode Toggle Button */}
        <button onClick={toggleDarkMode} className="toggle-dark-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {showAddUser && <FieExplorer onClose={() => setShowAddUser(false)} editingUser={editingUser} />}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderedUsers.map((item, index) => (
            <tr 
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.title}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileViewer;
