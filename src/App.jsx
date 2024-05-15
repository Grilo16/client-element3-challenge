import { routeIndex } from './pages'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import "bootstrap/dist/js/bootstrap.bundle"
import "./styleOverides.scss"
import { Nav, ProtectedRoute } from './components'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import keycloak from './features/api/keycloak'
import { setCookieJWTToken } from './features'
import { ReactKeycloakProvider } from '@react-keycloak/web'

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
    <ReactKeycloakProvider authClient={keycloak}>
      <Router>
        <Nav/>
        <Routes>
            {routes}
        </Routes>
      </Router>
    </ReactKeycloakProvider>

  )
}

export default App
