import { Routes, Route } from 'react-router'
import LandingPage from './pages'
import Signup from './pages/signup'
import Login from './pages/login'
import Forgot from './pages/forgotpassword'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login} />
      <Route path="/forgot" Component={Forgot} />
    </Routes>
  )
}

export default RoutesIndex