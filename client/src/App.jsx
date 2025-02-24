
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserTable from "./AtomicComponents/Table";


function App() {
  //const [count, setCount] = useState(0);
return (
    <Router>
      <> 
        <Routes>
          {/* <Route path="/" exact component={Home} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
