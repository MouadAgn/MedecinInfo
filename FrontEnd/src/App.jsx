import Login from './Login'
import { Routes, Route} from "react-router-dom"
import Home from './Home'
import Planning from './Planning'

function App() {
 
  return (
    <div>
        <Routes>
          <Route path="/planning" element={<Planning />}> </Route>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/login" element={<Login/>}></Route>        </Routes>
    </div>
  )
}

export default App
