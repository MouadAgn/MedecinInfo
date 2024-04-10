import { Routes, Route} from "react-router-dom"

import Login from './Login'
import Planning from './Planning'
import Home from './Home'

function App() {
 
  return (
    <div>
        <Routes>
          <Route path="/planning" element={<Planning />}> </Route>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default App
