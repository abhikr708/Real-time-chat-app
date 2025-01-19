import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Join from './component/Join/Join'; // Make sure to import your components
// import Chat from './components/Chat'; // Make sure to import your components

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Join/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;