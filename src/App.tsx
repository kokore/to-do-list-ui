import TodoList from "./todolist";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/api/v1/to-do-list" element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
