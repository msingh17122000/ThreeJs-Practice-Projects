import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Project1 from './Practice01'; // Example project component
import Project2 from './Practice02'; // Another example
import Project3 from './Practice03'; // Another example
import Project4 from './Practice04'; // Another example
import Project5 from './Practice05'; // Another example
import Project6 from './Practice06'; // Another example
import Project7 from './Practice07'; // Another example
import Project8 from './Practice08'; // Another example
import Project9 from './Practice09'; // Another example
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/project3" element={<Project3 />} />
        <Route path="/project4" element={<Project4 />} />
        <Route path="/project5" element={<Project5 />} />
        <Route path="/project6" element={<Project6 />} />
        <Route path="/project7" element={<Project7 />} />
        <Route path="/project8" element={<Project8 />} />
        <Route path="/project9" element={<Project9 />} />
      </Routes>
    </Router>
  );
}

export default App;