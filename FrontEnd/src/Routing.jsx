import { Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Planning from './Planning.jsx';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/patient" element={<Patient />} /> */}
      <Route path="/planning" element={<Planning />} />
      {/* <Route path="/profil" element={<Profil />} /> */}
    </Routes>
  )
}

export default Routing