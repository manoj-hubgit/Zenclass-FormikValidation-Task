import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Main from '../Pages/Main';
import Edit from '../Pages/Edit';
import Create from '../Pages/Create';
import EditAuthor from '../Pages/EditAuthor';
import EditBookForm from '../Pages/EditBookForm';
import EditAuthorForm from '../Pages/EditAuthorForm';

const App = () => {
const[id,setId]=useState(0)
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Main setId={setId}/>} />
          <Route path="/editbook" element={<Edit id={id} />} />
          <Route path="/editauthor" element={<EditAuthor id={id}/>}/>
          <Route path="/create" element={<Create />} />
          <Route path="/editbookform/:id" element={<EditBookForm />} />
          <Route path="/editauthorform/:id" element={<EditAuthorForm />} />
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default App;

