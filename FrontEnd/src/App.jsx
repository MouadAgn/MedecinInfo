import { Routes, Route} from "react-router-dom"

import Login from './Login'
import Planning from './Planning'
import Home from './Home'
import PatientAppointments from './PatientAppointments'
import Profil from "./Profil" 

function App() {
 
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/planning" element={<Planning/>}></Route>
          <Route path="/appointments/patient/:id" element={<PatientAppointments/>}></Route>
          <Route path="/profil" element={<Profil/>}></Route>
        </Routes>
    </div>
  )
}

export default App
