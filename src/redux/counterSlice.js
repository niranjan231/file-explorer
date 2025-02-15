import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { name: "PNG", email: "strict", title: "Gasoline", id: "1" },
    { name: "Personal", email: "gosh", title: "Diesel", id: "2" },
    { name: "Customizable", email: "Handcrafted", title: "Tanzanian", id: "3" },
    { name: "test", email: "test@gmail.com", title: "Test", id: "4" },
    { name: "Pintu", email: "pintu@gmail.com", title: "12345678", id: "5" },
    { name: "rewr", email: "niranjan962796@gmail.com", title: "werwwwwe", id: "6" }
  ],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ ...action.payload, id: Date.now().toString() });
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    editUser: (state, action) => {
      const { id, name, email, title } = action.payload;
      const existingUser = state.users.find(user => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.title = title;
      }
    }
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;