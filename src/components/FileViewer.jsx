import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../redux/counterSlice"; 
// import AddUser from "./AddUser"; 
import FieExplorer from "./FileExplorer";
import "../App.css";

const FileViewer = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowAddUser(true);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-1">
      <button className="post-btn" onClick={() => {
        setEditingUser(null);
        setShowAddUser(!showAddUser);
      }}>
        {showAddUser ? "Close" : "Post"}
      </button>

      {showAddUser && <FieExplorer onClose={() => setShowAddUser(false)} editingUser={editingUser} />}

      {/* Search Input Field */}
      <input
        type="text"
        placeholder="Search by Name, Email, or Title"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

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
          {filteredUsers.map((item) => (
            <tr key={item.id}>
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