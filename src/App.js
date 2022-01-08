import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RandomStudentGenerator from "./components/RandomStudentGenerator";
import Normal from "./components/Normal";
// import SpeachRecognition from "./components/SpeachRecg.jsx";
// import Abc from "./components/Abc";
// import Sample from "./components/Sample";
import Exportdata from './components/ExportData';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Normal/>} />
          <Route exact path="/generate" element={<RandomStudentGenerator />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
