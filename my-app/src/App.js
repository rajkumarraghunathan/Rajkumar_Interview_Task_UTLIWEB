import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DynamicForm from './Component/DynamicForm';
import FormPreview from './Component/FormPreview';
import './App.css';

function App() {
  const [savedForm, setSavedForm] = useState(null);
  return (

    <div className="App">

      <Routes>
        <Route path="/" element={<DynamicForm savedForm={savedForm} setSavedForm={setSavedForm} />} />
        <Route path="/preview" element={<FormPreview savedForm={savedForm} />} />
        <Route path="/" element={<DynamicForm savedForm={savedForm} setSavedForm={setSavedForm} />} />
      </Routes>

    </div>
  );
}

export default App;
