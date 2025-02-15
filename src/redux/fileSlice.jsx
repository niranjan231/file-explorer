// src/redux/fileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { initialFileSystem } from "../data";

const fileSlice = createSlice({
  name: "files",
  initialState: {
    fileSystem: initialFileSystem,
  },
  reducers: {
    addItem: (state, action) => {
      const { parentId, newItem } = action.payload;

      // If parentId is null, add the item at root
      if (parentId === null) {
        state.fileSystem.push(newItem);
      } else {
        const addItemRecursively = (nodes) => {
          nodes.forEach((node) => {
            if (node.id === parentId && node.type === "folder") {
              node.children = node.children || [];
              node.children.push(newItem);
            } else if (node.children) {
              addItemRecursively(node.children);
            }
          });
        };
        addItemRecursively(state.fileSystem);
      }
    },
    renameItem: (state, action) => {
      const { itemId, newName } = action.payload;
      const renameRecursively = (nodes) => {
        nodes.forEach((node) => {
          if (node.id === itemId) {
            node.name = newName;
          } else if (node.children) {
            renameRecursively(node.children);
          }
        });
      };
      renameRecursively(state.fileSystem);
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      const deleteRecursively = (nodes) => {
        return nodes
          .filter((node) => node.id !== itemId)
          .map((node) => {
            if (node.children) {
              return { ...node, children: deleteRecursively(node.children) };
            }
            return node;
          });
      };
      state.fileSystem = deleteRecursively(state.fileSystem);
    },
  },
});

export const { addItem, renameItem, deleteItem } = fileSlice.actions;
export default fileSlice.reducer;
