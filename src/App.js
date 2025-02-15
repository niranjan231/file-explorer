import { useSelector } from "react-redux";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
// import User from "./Componet/User";
import FieExplorer from "./components/FileExplorer";
import FileViewer from "./components/FileViewer";


function App() {



  return (
    <div>
      <FileViewer/>
      <Routes>
        <Route path="/filexplorer" element={<FieExplorer />} />
      </Routes>
    </div>
  );
}

export default App;