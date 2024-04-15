import { routeIndex } from './pages'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import "bootstrap/dist/js/bootstrap.bundle"
import "./styleOverides.scss"
import { Nav, ProtectedRoute } from './components'

function App() {
  
  
  const routes = routeIndex.map(({isProtected, element, ...route}, index) => 
    isProtected ? (
      <Route key={index} element={
          <ProtectedRoute>
            {element}
          </ProtectedRoute>
        } {...route}/>
    ) : (
      <Route key={index} element={element} {...route}/>
    )
)
  return (
    <Router>
      <Nav/>
      <Routes>
          {routes}
      </Routes>
    </Router>

  )
}

export default App
