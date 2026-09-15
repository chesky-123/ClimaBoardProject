import Layout from './components/Layout'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Compare from './pages/Compare' 
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} /> 
        <Route path='/login' element={<Login />} />
        
        <Route 
          path='/Home' 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        
        <Route 
          path='/compare' 
          element={<ProtectedRoute><Compare /></ProtectedRoute>} 
        />
        
        <Route path='*' element={<div>404 not found</div>} />
      </Route>
    </Routes>
  )
}