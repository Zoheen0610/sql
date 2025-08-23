import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/Theme";
import Navbar from "./components/Navbar";
import Query from "./pages/Query";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/query" element={<Query />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
