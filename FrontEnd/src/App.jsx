import Login from './Login'
import Planning from './Planning'
import Home from './Home'
import Patient from './Patient'
import AddPatient from './AddPatient'
import PatientAppointments from './PatientAppointments'
import Treatments from './Treatments'
import TreatmentsForm from './TreatmentsForm'
import TreatmentsUpdate from './TreatmentsUpdate'
import {Routes, Route} from "react-router-dom"
import AppointmentForm from "./AppointmentForm"

import Profil from "./Profil" 

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/planning" element={<Planning/>}></Route>
          <Route path="/patient/appointments/:id" element={<PatientAppointments/>}></Route>
          <Route path="/patient/treatments/:id" element={<Treatments/>}></Route>
          <Route path="/patient/treatments/add/:id" element={<TreatmentsForm/>}></Route>
          <Route path="/treatments/delete/:treatmentid/patient/:patientid" element={<Treatments/>}></Route>
          <Route path="/treatments/update/:treatmentid/patient/:patientid" element={<TreatmentsUpdate/>}></Route>
          <Route path="/patients" element={<Patient/>}></Route>
          <Route path="/patients/add" element={<AddPatient/>}></Route>
          <Route path="/profil" element={<Profil/>}></Route>
          <Route path="/patient/appointment/add/:id" element={<AppointmentForm/>}></Route>
        </Routes>
    </div>  
  )
}

export default App
