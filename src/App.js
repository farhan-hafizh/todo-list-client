import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your React components
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar component here */}
      <div className="container mx-auto px-4 py-8"> {/* Wrap your content with a container */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/about" element={<About />} />
          <Route path="/tasks/:taskId" element={<TaskDetail />} />
          <Route path="/about" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
