import Login from './Login'
import { Routes, Route} from "react-router-dom"
import Home from './Home'

function App() {
 
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default App
