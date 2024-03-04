import { Routes, Route } from 'react-router'
import LandingPage from './pages'
import Category from './pages/shop'
import Signup from './pages/signup'
import Login from './pages/login'
import Forgot from './pages/forgotpassword'
// import Shop from './pages/category'
import Product from './pages/product'

const RoutesIndex = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" Component={LandingPage} />
      {/* auth routes */}
      <Route path="/signup" Component={Signup} />
      <Route path="/login" Component={Login} />
      <Route path="/forgot" Component={Forgot} />
      {/* dashboard routes */}
      <Route path="/category" Component={Category} />
      {/* <Route path="/category/:id" Component={Shop} /> */}
      <Route path="/product/:id" Component={Product} />
    </Routes>
  )
}

export default RoutesIndex