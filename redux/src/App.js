
import { useEffect, useState } from 'react';
import AllRoutes from './routes';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState()
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  return (
    <Router >
      <AllRoutes token={token} />
    </Router>
  );

}

export default App;
