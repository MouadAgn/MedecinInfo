import Login from './Login'
import Planning from './Planning'
import Home from './Home'
import PatientAppointments from './PatientAppointments'
import {Routes, Route} from "react-router-dom"


function App() {
 
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/planning" element={<Planning/>}></Route>
          <Route path="/patient/:id/appointments" element={<PatientAppointments/>}></Route>
        </Routes>
    </div>
  )
}

export default App
