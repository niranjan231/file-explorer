// src/App.js
import React from "react";
import FileExplorer from "./components/FileExplorer";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import "../src/index.css";

function App() {
  return (
    <Provider store={store}>
      <FileExplorer />
    </Provider>
  );
}

export default App;
